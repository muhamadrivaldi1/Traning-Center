<?php

namespace App\Http\Controllers;

use App\Models\Training;
use App\Models\TrainingRegistration;
use Illuminate\Http\Request;
use Midtrans\Snap;
use Midtrans\Config;

class TrainingController extends Controller
{
    // ======================
    // GET ALL TRAININGS
    // ======================
    public function index()
    {
        return Training::latest()->get();
    }

    // ======================
    // REGISTER TRAINING
    // ======================
    public function register(Request $request, $id)
    {
        $user = $request->user();

        $training = Training::find($id);

        if (!$training) {
            return response()->json([
                'message' => 'Training tidak ditemukan'
            ], 404);
        }

        $exists = TrainingRegistration::where('user_id', $user->id)
            ->where('training_id', $id)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Anda sudah terdaftar'
            ], 409);
        }

        TrainingRegistration::create([
            'user_id'     => $user->id,
            'training_id' => $id,
            'progress'    => 0,
            'status'      => 'Aktif',
            'start_date'  => now(),
            'end_date'    => now()->addMonths(3),
        ]);

        return response()->json([
            'message' => 'Pendaftaran berhasil'
        ]);
    }

    // ======================
    // MY TRAININGS
    // ======================
    public function myTrainings(Request $request)
    {
        return TrainingRegistration::with('training')
            ->where('user_id', $request->user()->id)
            ->latest()
            ->get();
    }

     public function pay($id)
    {
        $registration = TrainingRegistration::with('training')
            ->where('id', $id)
            ->where('user_id', auth()->id())
            ->firstOrFail();

        // kalau sudah lunas → stop
        if ($registration->payment_status === 'success') {
            return response()->json([
                'message' => 'Sudah dibayar'
            ], 400);
        }

        // MIDTRANS CONFIG
        Config::$serverKey = config('midtrans.server_key');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;

        // jika token belum ada → buat
        if (!$registration->snap_token) {

            $params = [
                'transaction_details' => [
                    'order_id' => 'ORDER-' . $registration->id . '-' . time(),
                    'gross_amount' => $registration->training->cost,
                ],
                'customer_details' => [
                    'first_name' => auth()->user()->name,
                    'email' => auth()->user()->email,
                ],
            ];

            $snapToken = Snap::getSnapToken($params);

            $registration->update([
                'snap_token' => $snapToken,
                'payment_status' => 'pending'
            ]);
        }

        return response()->json([
            'snap_token' => $registration->snap_token
        ]);
    }
}
