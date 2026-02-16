<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::table('training_registrations', function (Blueprint $table) {
            // Cek dan tambah order_id (WAJIB untuk Midtrans)
            if (!Schema::hasColumn('training_registrations', 'order_id')) {
                $table->string('order_id')->nullable()->after('training_id');
            }
            
            // Cek dan tambah snap_token
            if (!Schema::hasColumn('training_registrations', 'snap_token')) {
                $table->string('snap_token')->nullable()->after('order_id');
            }
            
            // Cek dan tambah payment_status
            if (!Schema::hasColumn('training_registrations', 'payment_status')) {
                $table->string('payment_status')->default('pending')->after('status');
            }
        });
    }

    public function down()
    {
        Schema::table('training_registrations', function (Blueprint $table) {
            $columns = ['order_id', 'snap_token', 'payment_status'];
            foreach ($columns as $column) {
                if (Schema::hasColumn('training_registrations', $column)) {
                    $table->dropColumn($column);
                }
            }
        });
    }
};