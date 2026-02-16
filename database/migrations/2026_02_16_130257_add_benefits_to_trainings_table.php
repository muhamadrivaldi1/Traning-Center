<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('trainings', function (Blueprint $table) {
            // Menambahkan kolom benefits dengan tipe TEXT
            // nullable() agar kolom boleh kosong di awal
            $table->text('benefits')->nullable()->after('schedule');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('trainings', function (Blueprint $table) {
            // Menghapus kolom benefits jika migration di-rollback
            $table->dropColumn('benefits');
        });
    }
};