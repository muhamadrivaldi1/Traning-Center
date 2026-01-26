<?php

namespace App\Http\Controllers;

use App\Models\Training;
use App\Models\TrainingRegistration;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    // ====================
    // LIST TRAINING
    // ====================
    public function index()
    {
        return Training::all();
    }

    // ====================
    // REGISTER TRAINING
    // ====================
    public function register(Request $request, $id)
    {
        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Unauthorized'
            ], 401);
        }

        // ❌ cegah daftar dua kali
        $exists = TrainingRegistration::where('user_id', $user->id)
            ->where('training_id', $id)
            ->exists();

        if ($exists) {
            return response()->json([
                'message' => 'Anda sudah terdaftar di pelatihan ini'
            ], 409);
        }

        TrainingRegistration::create([
            'user_id' => $user->id,
            'training_id' => $id,
            'progress' => 0,
            'status' => 'Aktif',
            'start_date' => now(),
            'end_date' => now()->addMonths(3),
        ]);

        return response()->json([
            'message' => 'Pendaftaran berhasil'
        ]);
    }

    // ====================
    // MY TRAININGS
    // ====================
    public function myTrainings(Request $request)
    {
        $user = $request->user();

        return TrainingRegistration::with('training')
            ->where('user_id', $user->id)
            ->latest()
            ->get();
    }
}
