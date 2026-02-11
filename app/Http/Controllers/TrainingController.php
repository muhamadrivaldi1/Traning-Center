<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Training;
use App\Models\TrainingRegistration;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log; // <--- Tambahkan ini

class TrainingController extends Controller
{
    /**
     * Lihat semua pelatihan (untuk dropdown pendaftaran)
     */
    public function index()
    {
        try {
            $trainings = Training::all(); // Ambil semua pelatihan
            return response()->json($trainings, 200);
        } catch (\Exception $e) {
            Log::error("Error fetching trainings: " . $e->getMessage());
            return response()->json([
                'message' => 'Gagal mengambil data pelatihan'
            ], 500);
        }
    }

    /**
     * Lihat daftar pelatihan yang dimiliki user
     */
    public function myTrainings()
    {
        $user = Auth::user();

        try {
            $registrations = TrainingRegistration::with('training')
                ->where('user_id', $user->id)
                ->get();

            return response()->json($registrations, 200);
        } catch (\Exception $e) {
            Log::error("Error fetching user trainings: " . $e->getMessage());
            return response()->json([
                'message' => 'Gagal mengambil data pelatihan user'
            ], 500);
        }
    }

    /**
     * Lihat detail pelatihan
     */
    public function show($id)
    {
        try {
            $training = Training::find($id);

            if (!$training) {
                return response()->json([
                    'message' => 'Training tidak ditemukan'
                ], 404);
            }

            return response()->json($training, 200);
        } catch (\Exception $e) {
            Log::error("Error fetching training details: " . $e->getMessage());
            return response()->json([
                'message' => 'Gagal mengambil detail pelatihan'
            ], 500);
        }
    }

    /**
     * Daftar training baru
     */
    public function register($id)
    {
        $user = Auth::user();

        try {
            // Cek apakah sudah terdaftar
            $exists = TrainingRegistration::where('user_id', $user->id)
                ->where('training_id', $id)
                ->first();

            if ($exists) {
                return response()->json([
                    'message' => 'Sudah terdaftar di training ini'
                ], 400);
            }

            $registration = TrainingRegistration::create([
                'user_id' => $user->id,
                'training_id' => $id,
                'status' => 'pending',
                'start_date' => now(),
                'end_date' => now()->addMonths(3),
            ]);

            return response()->json([
                'message' => 'Berhasil mendaftar training',
                'registration' => $registration
            ], 201);
        } catch (\Exception $e) {
            Log::error("Error registering training: " . $e->getMessage());
            return response()->json([
                'message' => 'Gagal mendaftar pelatihan'
            ], 500);
        }
    }
}
