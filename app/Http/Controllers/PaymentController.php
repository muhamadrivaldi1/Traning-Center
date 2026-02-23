<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\TrainingRegistration;
use App\Models\Training;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Carbon\Carbon;

class PaymentController extends Controller
{
    private function midtransConfig()
    {
        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized = env('MIDTRANS_IS_SANITIZED', true);
        Config::$is3ds = env('MIDTRANS_IS_3DS', true);
    }

    public function checkout(Request $request)
    {
        $user = Auth::user();
        if (!$user) return response()->json(['message' => 'Unauthorized'], 401);

        $request->validate(['training_id' => 'required|exists:trainings,id']);

        $this->cleanupExpired();

        $training = Training::find($request->training_id);
        $orderId = 'TCF-' . $user->id . '-' . time();
        
        $startDate = $training->start_date ?? now();
        $endDate = $training->end_date ?? Carbon::parse($startDate)->addMonths(3);

        // --- PENAMBAHAN LOGIKA GRATIS ---
        $price = (int) $training->price;

        $registration = TrainingRegistration::updateOrCreate(
            [
                'user_id' => $user->id,
                'training_id' => $training->id,
                'payment_status' => 'pending'
            ],
            [
                'order_id' => $orderId,
                'start_date' => $startDate,
                'end_date' => $endDate,
                'status' => ($price == 0) ? 'active' : 'inactive', // Aktifkan jika gratis
                'payment_status' => ($price == 0) ? 'success' : 'pending', // Sukses jika gratis
                'progress' => 0
            ]
        );

        // Jika gratis, langsung balas tanpa panggil Midtrans
        if ($price == 0) {
            return response()->json([
                'status' => 'success', 
                'message' => 'Pendaftaran berhasil (Gratis)',
                'is_free' => true
            ]);
        }
        // --------------------------------

        return $this->generateMidtransSnap($registration, $training, $user);
    }

    public function getSnapToken($id)
    {
        $user = Auth::user();
        $this->cleanupExpired();

        $registration = TrainingRegistration::with('training')
            ->where('id', $id)->where('user_id', $user->id)->first();

        if (!$registration || $registration->payment_status === 'failed') {
            return response()->json(['message' => 'Tagihan kadaluarsa (5 Menit)'], 404);
        }

        $newOrderId = 'TCF-' . $user->id . '-' . time();
        $registration->update(['order_id' => $newOrderId]);

        return $this->generateMidtransSnap($registration, $registration->training, $user);
    }

    private function generateMidtransSnap($registration, $training, $user)
    {
        $this->midtransConfig();
        $params = [
            'transaction_details' => [
                'order_id' => $registration->order_id,
                'gross_amount' => (int) $training->price,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
            'expiry' => [
                'start_time' => date("Y-m-d H:i:s O"),
                'unit' => 'minutes',
                'duration' => 5 
            ]
        ];

        try {
            $snapToken = Snap::getSnapToken($params);
            $registration->update(['snap_token' => $snapToken]);
            return response()->json(['status' => 'success', 'snap_token' => $snapToken, 'is_free' => false]);
        } catch (\Exception $e) {
            Log::error('Midtrans Error: ' . $e->getMessage());
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function cleanupExpired()
    {
        $now = now();
        TrainingRegistration::where('payment_status', 'pending')
            ->where('created_at', '<', $now->copy()->subMinutes(5))
            ->update(['payment_status' => 'failed']);

        TrainingRegistration::where('created_at', '<', $now->copy()->subHours(24))
            ->delete();
    }

    public function callback(Request $request)
    {
        $serverKey = config('services.midtrans.server_key');
        $hashed = hash("sha512", $request->order_id . $request->status_code . $request->gross_amount . $serverKey);

        if ($hashed == $request->signature_key) {
            $registration = TrainingRegistration::where('order_id', $request->order_id)->first();
            if ($registration) {
                if (in_array($request->transaction_status, ['settlement', 'capture'])) {
                    $registration->update(['payment_status' => 'success', 'status' => 'active', 'paid_at' => now()]);
                } elseif (in_array($request->transaction_status, ['deny', 'expire', 'cancel'])) {
                    $registration->update(['payment_status' => 'failed']);
                }
            }
        }
    }
}