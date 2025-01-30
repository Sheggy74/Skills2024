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
            $table->comment('Отслеживание состояния задачи');
            $table->id()->comment('Идентификатор сотояния задачи');
            $table->date('date_start')->comment('Дата начала');
            $table->date('date_end')->comment('Дата завершения');
            $table->bigInteger('task_id')->comment('Идентификатор задачи');
            $table->bigInteger('user_id')->comment('Идентификатор пользователя');
            $table->bigInteger('state_task_id')->comment('Идентификатор состояния');
            $table->timestamp('created_at')->nullable()->comment('Дата создания');
            $table->timestamp('updated_at')->nullable()->comment('Дата изменения');

            $table->foreign('task_id')->references('id')->on('task')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('state_task_id')->references('id')->on('state_task')->onDelete('cascade');
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
