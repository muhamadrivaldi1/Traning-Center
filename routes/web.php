<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Halaman utama React / SPA
Route::get('/', function () {
    return view('app'); // pastikan pakai app.blade.php
});

/*
|--------------------------------------------------------------------------
| Catch All Route (UNTUK REACT)
|--------------------------------------------------------------------------
| Tangkap semua route KECUALI yang diawali dengan "api"
*/

Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*$');
