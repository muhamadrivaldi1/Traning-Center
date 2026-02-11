<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\PaymentController;

/*
|--------------------------------------------------------------------------
| PUBLIC ROUTES
|--------------------------------------------------------------------------
|
| Route yang bisa diakses tanpa login.
|
*/

Route::get('/', function () {
    return response()->json([
        'message' => 'API Laravel siap!'
    ]);
});

// ===== AUTH =====
Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
// Contoh response: {"token": "xxxx", "user": {...}}

Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
// Contoh response: {"message": "Registrasi berhasil", "user": {...}}

// ===== TRAINING (PUBLIC) =====
Route::get('/training', [TrainingController::class, 'index'])->name('training.index');
// Contoh response: [{"id":1,"title":"Training 1"}, {"id":2,"title":"Training 2"}]

Route::get('/training/{id}', [TrainingController::class, 'show'])->name('training.show');
// Contoh response: {"id":1,"title":"Training 1","description":"..."}

// ===== TRANSACTION CREATE =====
Route::post('/create-transaction', [TransactionController::class, 'create'])->name('transaction.create');
// Contoh response: {"transaction_id":123, "status":"pending"}

/*
|--------------------------------------------------------------------------
| PROTECTED ROUTES (LOGIN REQUIRED)
|--------------------------------------------------------------------------
|
| Route yang membutuhkan autentikasi menggunakan Sanctum.
|
*/
Route::middleware('auth:sanctum')->group(function () {

    // ===== USER TRAININGS =====
    Route::get('/my-trainings', [TrainingController::class, 'myTrainings'])->name('training.my');
    // Contoh response: [{"id":1,"title":"Training 1","status":"registered"}]

    // ===== REGISTER TRAINING =====
    Route::post('/training/{id}/register', [TrainingController::class, 'register'])->name('training.register');
    // Contoh response: {"message":"Berhasil mendaftar training", "training_id":1}

    // ===== MIDTRANS SNAP TOKEN =====
    Route::get('/snap-token/{id}', [PaymentController::class, 'getSnapToken'])->name('payment.snap');
    // Contoh response: {"token":"xxxxx"}
});
