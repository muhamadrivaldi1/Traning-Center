<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Snap;
use App\Models\TrainingRegistration;
use App\Models\Training;

class PaymentController extends Controller
{
    public function pay(Request $request)
    {
        $training = Training::where('name', $request->training_name)->firstOrFail();

        $registration = TrainingRegistration::create([
            'user_id'     => auth()->id() ?? 1,
            'training_id' => $training->id,
            'status'      => 'Pending',
            'start_date'  => now(),
            'end_date'    => now()->addMonths(3),
        ]);

        $trainingPrice = (int) $training->cost;

        Config::$serverKey = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = false;
        Config::$isSanitized = true;
        Config::$is3ds = true;

        $params = [
            'transaction_details' => [
                'order_id' => 'TRG-' . $registration->id . '-' . time(),
                'gross_amount' => $trainingPrice,
            ],
            'customer_details' => [
                'first_name' => $request->nama, 
                'email' => $request->email, 
            ],
        ];

        $snapToken = Snap::getSnapToken($params);

        $registration->update(['snap_token' => $snapToken]);

        return response()->json(['snap_token' => $snapToken]);
    }
}