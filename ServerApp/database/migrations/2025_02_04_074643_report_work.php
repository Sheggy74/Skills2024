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
        //
        Schema::create('report_work',function (Blueprint $table){
            $table->comment('Отчет по работе');
            $table->id()->comment('Идентификатор отчета');
            $table->bigInteger('task_id')->comment('Идентификатор объема работы в день');
            $table->date('date')->comment('Дата выполнения работы');
            $table->string('description')->nullable()->comment('Что выполнено');
            $table->integer('percent')->comment('Объем выполнения задачи');

            $table->foreign('task_id')->references('id')->on('task')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_work');
    }
};
