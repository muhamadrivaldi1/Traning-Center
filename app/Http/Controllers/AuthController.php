<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User; // Pastikan model User diimpor

class AuthController extends Controller
{
    /**
     * Menangani proses Login User
     */
    public function login(Request $request)
    {
        // 1. Validasi input
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required'
        ]);

        // 2. Cek kredensial (email & password)
        if (!Auth::attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => 'Email atau password salah'
            ], 401);
        }

        // 3. Ambil data user dan beri tahu VS Code tipe datanya agar tidak merah
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 4. Buat token baru untuk sesi ini
        $token = $user->createToken('auth_token')->plainTextToken;

        // 5. Kirim response sukses ke React
        return response()->json([
            'message' => 'Login berhasil',
            'user'    => $user,
            'token'   => $token
        ], 200);
    }

    /**
     * Menangani proses Registrasi User baru
     */
    public function register(Request $request)
    {
        // 1. Validasi data pendaftaran
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        // 2. Simpan user baru ke database MySQL
        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password), // Password di-enkripsi
        ]);

        // 3. Buat token otomatis setelah register
        /** @var \App\Models\User $user */
        $token = $user->createToken('auth_token')->plainTextToken;

        // 4. Kirim response ke React
        return response()->json([
            'message' => 'Register berhasil',
            'user'    => $user,
            'token'   => $token
        ], 201);
    }
}