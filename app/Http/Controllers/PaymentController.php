<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\TrainingRegistration;
use App\Models\Training;
use Illuminate\Support\Facades\Auth;

class PaymentController extends Controller
{
    /**
     * Membuat Snap Token baru untuk pembayaran training
     */
    public function pay(Request $request)
    {
        // 1️⃣ Validasi input
        $request->validate([
            'training_name' => 'required|string|exists:trainings,name',
        ]);

        // 2️⃣ Pastikan user login
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User harus login'], 401);
        }

        // 3️⃣ Cari training
        $training = Training::where('name', $request->training_name)->firstOrFail();

        // 4️⃣ Buat registration baru (status pending)
        $registration = TrainingRegistration::create([
            'user_id'     => $user->id,
            'training_id' => $training->id,
            'status'      => 'pending',
            'start_date'  => now(),
            'end_date'    => now()->addMonths(3),
        ]);

        // 5️⃣ Konfigurasi Midtrans
        $this->midtransConfig();

        // 6️⃣ Siapkan parameter transaksi
        $orderId = 'TRG-' . $registration->id . '-' . time();
        $grossAmount = (int) ($training->price ?? 0);

        $params = [
            'transaction_details' => [
                'order_id'     => $orderId,
                'gross_amount' => $grossAmount,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email'      => $user->email,
                'phone'      => $user->phone ?? '',
            ],
        ];

        // 7️⃣ Generate Snap Token
        try {
            $snapToken = Snap::getSnapToken($params);

            // 8️⃣ Simpan snap token + order_id ke database
            $registration->update([
                'snap_token' => $snapToken,
                'order_id'   => $orderId,
            ]);

            return response()->json([
                'status'     => 'success',
                'snap_token' => $snapToken,
                'order_id'   => $orderId,
                'registration_id' => $registration->id,
            ]);

        } catch (\Exception $e) {
            // Hapus registration jika gagal generate token
            $registration->delete();

            return response()->json([
                'status'  => 'error',
                'message' => 'Gagal membuat token Midtrans: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Ambil Snap Token untuk registration tertentu
     */
    public function getSnapToken($id)
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User harus login'], 401);
        }

        $registration = TrainingRegistration::with('training')
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $this->midtransConfig();

        $orderId = $registration->order_id ?? 'TRG-' . $registration->id . '-' . time();
        $grossAmount = (int) ($registration->training->price ?? 0);

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => $grossAmount,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email'      => $user->email,
                'phone'      => $user->phone ?? '',
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);

            // Simpan token terbaru ke database
            $registration->update(['snap_token' => $snapToken]);

            return response()->json(['snap_token' => $snapToken]);

        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    /**
     * Helper konfigurasi Midtrans
     */
    private function midtransConfig()
    {
        Config::$serverKey     = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction  = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized   = true;
        Config::$is3ds         = true;
    }
}
