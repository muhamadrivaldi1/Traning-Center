<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TrainingController;

// =======================
// PUBLIC
// =======================
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/training', [TrainingController::class, 'index']);

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
