<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('trainings', function (Blueprint $table) {
            // tambah kolom certificate
            $table->string('certificate_image')->nullable()->after('image');
        });
    }

    public function down()
    {
        Schema::table('trainings', function (Blueprint $table) {
            // jika migrasi dibatalkan (rollback)
            $table->dropColumn('certificate_image');
        });
    }
};