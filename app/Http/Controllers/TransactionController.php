<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;


class TransactionController extends Controller
{
    public function create(Request $request)
    {
        // Pastikan user login
        $user = $request->user();
        if (!$user) {
            return response()->json([
                'status' => 'error',
                'message' => 'User harus login'
            ], 401);
        }

        // Ambil data dari request
        $order_id = $request->input('order_id');
        $amount   = $request->input('amount'); // pastikan frontend kirim "amount"

        if (!$order_id || !$amount) {
            return response()->json([
                'status' => 'error',
                'message' => 'Order ID dan amount wajib diisi'
            ], 400);
        }

        // Konfigurasi Midtrans
        Config::$serverKey    = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false); // false = sandbox
        Config::$isSanitized  = true;
        Config::$is3ds        = true;

        // Parameter transaksi
        $params = [
            'transaction_details' => [
                'order_id'     => $order_id,
                'gross_amount' => (int) $amount,
            ],
            'customer_details' => [
                'first_name' => $user->name ?? 'User',
                'email'      => $user->email ?? 'user@example.com',
            ],
        ];

        try {
            // Generate Snap token
            $snapToken = Snap::getSnapToken($params);

            return response()->json([
                'status'    => 'success',
                'snapToken' => $snapToken,
                'order_id'  => $order_id,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Gagal membuat transaksi: ' . $e->getMessage()
            ], 500);
        }
    }
}
