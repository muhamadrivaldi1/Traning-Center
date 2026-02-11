<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\TrainingRegistration;
use App\Models\Training;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class PaymentController extends Controller
{
    public function getSnapToken(Request $request, $id)
    {
        $user = Auth::user();

        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized'
            ], 401);
        }

        // Ambil registration milik user
        $registration = TrainingRegistration::with('training')
            ->where('id', $id)
            ->where('user_id', $user->id)
            ->first();

        if (!$registration) {
            return response()->json([
                'status' => 'error',
                'message' => 'Data registrasi tidak ditemukan'
            ], 404);
        }

        if (!$registration->training || !$registration->training->price) {
            return response()->json([
                'status' => 'error',
                'message' => 'Harga training tidak valid'
            ], 400);
        }

        $this->midtransConfig();

        // Buat order id unik
        $orderId = 'TRX-' . $registration->id . '-' . Str::random(5);

        $params = [
            'transaction_details' => [
                'order_id' => $orderId,
                'gross_amount' => (int) $registration->training->price,
            ],
            'customer_details' => [
                'first_name' => $user->name,
                'email' => $user->email,
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);

            $registration->update([
                'snap_token' => $snapToken,
                'order_id'   => $orderId,
                'payment_status' => 'pending'
            ]);

            return response()->json([
                'status' => 'success',
                'snap_token' => $snapToken
            ]);

        } catch (\Exception $e) {

            return response()->json([
                'status' => 'error',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    private function midtransConfig()
    {
        Config::$serverKey = config('services.midtrans.server_key');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;
    }
}
