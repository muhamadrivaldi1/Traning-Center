<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| API Routes - Training Center
|--------------------------------------------------------------------------
*/

// =========================================================================
// PUBLIC ROUTES (Bisa Diakses Tanpa Login)
// =========================================================================

Route::get('/', function () {
    return response()->json([
        'message' => 'API Training Center Laravel Aktif',
        'version' => '1.0'
    ]);
});

// AUTH
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

// TRAINING (Untuk Katalog di Dashboard & Detail)
Route::get('/trainings', [TrainingController::class, 'index']);
Route::get('/trainings/{id}', [TrainingController::class, 'show']);

// MIDTRANS CALLBACK (Wajib Public agar Midtrans bisa mengirim status)
Route::post('/midtrans-callback', [PaymentController::class, 'callback']);


// =========================================================================
// PROTECTED ROUTES (Wajib Login / Menggunakan Bearer Token)
// =========================================================================

Route::middleware('auth:sanctum')->group(function () {

    // USER PROFILE
    Route::get('/user', function () {
        return auth()->user();
    });
    Route::post('/logout', [AuthController::class, 'logout']);

    // PEMBAYARAN & CHECKOUT
    // Membuat transaksi awal (saat klik "Daftar Sekarang")
    Route::post('/checkout', [PaymentController::class, 'checkout']);

    // Mengambil Snap Token Midtrans untuk pop-up pembayaran
    Route::get('/snap-token/{id}', [PaymentController::class, 'getSnapToken']);

    // PELATIHAN SAYA & PEMBELAJARAN
    // 1. Daftar pelatihan yang diikuti user (untuk halaman Pelatihan Saya / Status Bayar)
    Route::get('/my-trainings', [TrainingController::class, 'myTrainings']);
    
    // 2. Konten Materi (Digunakan di halaman Pembelajaran.jsx untuk ambil Video & Modul)
    // URL: http://127.0.0.1:8000/api/trainings/{id}/contents
    Route::get('/trainings/{id}/contents', [TrainingController::class, 'getContents']);

    // CLEANUP
    // Membersihkan transaksi yang sudah expired
    Route::get('/my-trainings/cleanup', [PaymentController::class, 'cleanupExpired']);
});