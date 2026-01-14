import React from "react";
import { Users, BookOpen, CreditCard, BarChart3 } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">

      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <div className="flex items-center gap-4">
            <Users className="w-8 h-8 text-indigo-600" />
            <div>
              <p className="text-sm text-gray-500">Total User</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">120</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <div className="flex items-center gap-4">
            <BookOpen className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Pelatihan</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <div className="flex items-center gap-4">
            <CreditCard className="w-8 h-8 text-yellow-600" />
            <div>
              <p className="text-sm text-gray-500">Pembayaran</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">45</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-5 rounded-2xl shadow">
          <div className="flex items-center gap-4">
            <BarChart3 className="w-8 h-8 text-pink-600" />
            <div>
              <p className="text-sm text-gray-500">Laporan</p>
              <p className="text-xl font-semibold text-gray-800 dark:text-gray-100">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabel User */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Data User Terbaru
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-sm text-gray-500 border-b">
                <th className="py-2">Nama</th>
                <th className="py-2">Email</th>
                <th className="py-2">Role</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 text-gray-800 dark:text-gray-100">Andi</td>
                <td className="py-2 text-gray-600">andi@mail.com</td>
                <td className="py-2">User</td>
                <td className="py-2 text-green-600">Aktif</td>
              </tr>
              <tr className="border-b hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 text-gray-800 dark:text-gray-100">Siti</td>
                <td className="py-2 text-gray-600">siti@mail.com</td>
                <td className="py-2">Admin</td>
                <td className="py-2 text-green-600">Aktif</td>
              </tr>
              <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="py-2 text-gray-800 dark:text-gray-100">Budi</td>
                <td className="py-2 text-gray-600">budi@mail.com</td>
                <td className="py-2">User</td>
                <td className="py-2 text-red-600">Nonaktif</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
