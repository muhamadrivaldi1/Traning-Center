<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use Illuminate\Support\Facades\DB;

class TransactionController extends Controller
{
    // pastikan route ini pakai middleware auth:api atau auth:sanctum
    public function create(Request $request)
    {
        // validasi input dari frontend
        $request->validate([
            'training_id' => 'required|integer|exists:trainings,id',
            'order_id' => 'required|string',
        ]);

        $training_id = $request->input('training_id');
        $order_id = $request->input('order_id');

        // ambil data kursus dari database
        $training = DB::table('trainings')->where('id', $training_id)->first();

        if (!$training) {
            return response()->json([
                'message' => 'Training tidak ditemukan'
            ], 404);
        }

        $amount = $training->price; // ambil harga dari database

        // konfigurasi Midtrans
        Config::$serverKey = env('MIDTRANS_SERVER_KEY'); // server key sandbox
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION') === 'true';
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // siapkan parameter transaksi
        $params = [
            'transaction_details' => [
                'order_id' => $order_id,
                'gross_amount' => (int) $amount,
            ],
            'item_details' => [
                [
                    'id' => $training->id,
                    'price' => (int) $amount,
                    'quantity' => 1,
                    'name' => $training->name
                ]
            ],
            'customer_details' => [
                'first_name' => $request->user()->name ?? 'User',
                'email' => $request->user()->email ?? 'user@example.com',
            ],
        ];

        try {
            $snapToken = Snap::getSnapToken($params);

            return response()->json([
                'snapToken' => $snapToken,
                'training' => [
                    'id' => $training->id,
                    'name' => $training->name,
                    'price' => $amount
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal membuat transaksi',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
