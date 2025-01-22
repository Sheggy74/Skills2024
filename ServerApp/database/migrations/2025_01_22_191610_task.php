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
        Schema::create('task',function (Blueprint $table){
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->bigInteger('project_id');
            $table->bigInteger('user_id');
            $table->bigInteger('stage_task_id');
            $table->dateTime('date_start');
            $table->dateTime('date_end');

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('project_id')->references('id')->on('project');
            $table->foreign('stage_task_id')->references('id')->on('stage_task');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task');
    }
};
