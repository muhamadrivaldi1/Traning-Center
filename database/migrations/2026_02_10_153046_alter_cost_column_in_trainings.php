<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up()
    {
        // 1. Tambah kolom price JIKA BELUM ADA
        if (!Schema::hasColumn('trainings', 'price')) {
            Schema::table('trainings', function (Blueprint $table) {
                $table->integer('price')->after('schedule');
            });
        }

        // 2. Kalau kolom cost masih ada, convert datanya
        if (Schema::hasColumn('trainings', 'cost')) {
            DB::statement("
                UPDATE trainings
                SET price = REPLACE(
                    REPLACE(
                        REPLACE(cost, 'Rp', ''),
                    '.', ''),
                ' ', '')
            ");

            Schema::table('trainings', function (Blueprint $table) {
                $table->dropColumn('cost');
            });
        }
    }

    public function down()
    {
        // Balikin kolom cost kalau belum ada
        if (!Schema::hasColumn('trainings', 'cost')) {
            Schema::table('trainings', function (Blueprint $table) {
                $table->string('cost')->after('schedule');
            });

            DB::statement("
                UPDATE trainings
                SET cost = CONCAT('Rp ', FORMAT(price, 0))
            ");
        }

        // Hapus price kalau ada
        if (Schema::hasColumn('trainings', 'price')) {
            Schema::table('trainings', function (Blueprint $table) {
                $table->dropColumn('price');
            });
        }
    }
};
