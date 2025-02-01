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
        Schema::create('rule_task', function (Blueprint $table) {
            $table->comment('Права исполнителей на задачу');
            $table->id()->comment('Идентификатор прав на задачу');
            $table->bigInteger('user_id')->comment('Идентификатор пользователя');
            $table->bigInteger('task_id')->comment('Идентификатор задачи');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('task_id')->references('id')->on('task')->onDelete('cascade');
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
