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
        Schema::create('user_trainings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('training_id');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('progress')->default(0);
            $table->enum('status', ['Pending', 'Aktif', 'Selesai'])->default('Pending');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_trainings');
    }
};
