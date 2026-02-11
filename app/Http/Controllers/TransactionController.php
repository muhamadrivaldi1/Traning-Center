<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;
use App\Models\Training;
use Illuminate\Support\Facades\Auth;
use Midtrans\Config;
use Midtrans\Snap;

class TransactionController extends Controller
{
    /**
     * Buat transaksi baru dan generate Snap Token
     * Request body:
     * {
     *   "training_id": 1
     * }
     */
    public function create(Request $request)
    {
        $request->validate([
            'training_id' => 'required|exists:trainings,id',
        ]);

        $user = Auth::user();
        if (!$user) {
            return response()->json(['error' => 'User harus login'], 401);
        }

        $training = Training::findOrFail($request->training_id);

        // Buat transaksi di database
        $transaction = Transaction::create([
            'user_id'     => $user->id,
            'training_id' => $training->id,
            'amount'      => $training->price,
            'status'      => 'pending',
        ]);

        // Konfigurasi Midtrans
        $this->midtransConfig();

        // Siapkan parameter transaksi
        $orderId = 'TRX-' . $transaction->id . '-' . time();
        $grossAmount = (int) $training->price;

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

            // Simpan order_id dan snap_token
            $transaction->update([
                'order_id'   => $orderId,
                'snap_token' => $snapToken,
            ]);

            return response()->json([
                'status'      => 'success',
                'transaction' => $transaction,
                'snap_token'  => $snapToken,
                'order_id'    => $orderId,
            ]);
        } catch (\Exception $e) {
            // Hapus transaksi jika gagal generate token
            $transaction->delete();
            return response()->json([
                'status'  => 'error',
                'message' => 'Gagal membuat token Midtrans: ' . $e->getMessage()
            ], 500);
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
