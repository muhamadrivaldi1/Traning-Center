<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User; // Mengimpor Model User
use Illuminate\Support\Facades\Hash; // Mengimpor Helper Hash
use Illuminate\Support\Facades\Auth; // Mengimpor Helper Auth

class ProfileController extends Controller
{
    /**
     * Update data profil user (Nama, Email, Password).
     */
    public function update(Request $request)
    {
        // Memberitahu VS Code bahwa $user adalah objek dari Model User
        /** @var \App\Models\User $user */
        $user = Auth::user();

        // 1. Validasi data yang masuk dari React
        $request->validate([
            'name'  => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:8', // Password tidak wajib diisi
        ]);

        // 2. Update Nama dan Email
        $user->name = $request->name;
        $user->email = $request->email;

        // 3. Update Password hanya jika kolom password diisi
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        // 4. Simpan perubahan ke MySQL
        $user->save();

        // 5. Kirim respon balik ke React agar tampilan terupdate
        return response()->json([
            'message' => 'Profil berhasil diperbarui di database!',
            'user' => $user
        ]);
    }
}