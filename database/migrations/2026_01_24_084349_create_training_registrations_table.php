<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up()
    {
        Schema::create('training_registrations', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->foreignId('training_id')
                ->constrained('training')
                ->cascadeOnDelete();

            $table->integer('progress')->default(0);
            $table->string('status')->default('Aktif');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('snap_token')->nullable();
            $table->string('payment_status')->default('pending');
            $table->string('payment_type')->nullable();
            $table->timestamp('paid_at')->nullable();


            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('training_registrations');
    }
};
