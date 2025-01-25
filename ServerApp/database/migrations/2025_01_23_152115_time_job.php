<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('time_job',function (Blueprint $table){
            $table->id();
            $table->date('date_start');
            $table->date('date_end');
            $table->bigInteger('task_id');
            $table->bigInteger('user_id');
            $table->bigInteger('state_task_id');
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            $table->foreign('task_id')->references('id')->on('task');
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('state_task_id')->references('id')->on('state_task');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
