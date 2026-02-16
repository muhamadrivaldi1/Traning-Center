<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'API Laravel siap!'
    ]);
});

// ===== AUTHENTICATION =====
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
Route::post('/register', [AuthController::class, 'register'])->name('auth.register');

// ===== TRAINING (PUBLIC) =====
// Menggunakan '/trainings' agar sinkron dengan Dashboard.jsx kamu
Route::get('/trainings', [TrainingController::class, 'index'])->name('trainings.index');
Route::get('/trainings/{id}', [TrainingController::class, 'show'])->name('trainings.show');

// ===== MIDTRANS CALLBACK (Wajib Public) =====
Route::post('/midtrans-callback', [PaymentController::class, 'callback'])->name('payment.callback');

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (LOGIN REQUIRED)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {

    // --- PAYMENT & CHECKOUT ---
    // 1. Membuat transaksi baru dan mendapatkan Snap Token
    Route::post('/checkout', [PaymentController::class, 'checkout'])->name('payment.checkout');

    // 2. Mengambil kembali Snap Token untuk transaksi yang sudah ada
    Route::get('/payments/snap-token/{id}', [PaymentController::class, 'getSnapToken'])->name('payment.snap');

    // --- USER TRAININGS ---
    // 3. Mengambil daftar pelatihan yang diikuti oleh user login
    Route::get('/my-trainings', [TrainingController::class, 'myTrainings'])->name('trainings.my');

    // 4. Sinkronisasi status atau pembersihan transaksi kadaluarsa
    Route::get('/my-trainings/cleanup', [PaymentController::class, 'cleanupExpired'])->name('trainings.cleanup');

    // 5. Registrasi pelatihan secara manual (jika diperlukan)
    Route::post('/trainings/{id}/register', [TrainingController::class, 'register'])->name('trainings.register');
});