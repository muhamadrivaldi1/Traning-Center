<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\PaymentController;
use App\Http\Controllers\TransactionController; 

// =======================
// PUBLIC
// =======================

Route::middleware('auth:sanctum')->get('/snap-token/{id}', [PaymentController::class, 'getSnapToken']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/snap-token/{id}', [PaymentController::class, 'getSnapToken']);
    Route::post('/training/{id}/register', [TrainingController::class, 'register']);
    Route::get('/training', [TrainingController::class, 'index']);
    Route::get('/my-trainings', [TrainingController::class, 'myTrainings']);
});

Route::post('/snap-token', [PaymentController::class, 'getSnapToken']);
Route::get('/trainings/{id}', [TrainingController::class, 'show']);
Route::post('/create-transaction', [TransactionController::class, 'create']);


// =======================
// PROTECTED
// =======================
Route::middleware('auth:sanctum')->group(function () {

    Route::post(
        '/training/{id}/register',
        [TrainingController::class, 'register']
    );

    Route::get(
        '/my-trainings',
        [TrainingController::class, 'myTrainings']
    );
});
