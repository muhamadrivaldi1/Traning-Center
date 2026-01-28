<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrainingController;
use App\Http\Controllers\PaymentController;

// =======================
// PUBLIC
// =======================
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/register-training', [PaymentController::class, 'pay']);

Route::get('/trainings', [TrainingController::class, 'index']);

// =======================
// PROTECTED
// =======================
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/trainings/{id}/register', [TrainingController::class, 'register']);
    Route::get('/my-trainings', [TrainingController::class, 'myTrainings']);
});
