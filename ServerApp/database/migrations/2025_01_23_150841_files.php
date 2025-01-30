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
        Schema::create('files',function (Blueprint $table){
            $table->comment('Файлы');
            $table->id()->comment('Идентификатор файла');
            $table->string('name')->nullable()->comment('Наименование файла');
            $table->binary('data')->nullable()->comment('Дата файла');
            $table->string('type')->nullable()->comment('Тип файла');
            $table->string('size')->nullable()->comment('Размер файла');
            $table->bigInteger('chat_id')->nullable()->comment('Идентификатор чата');

            $table->foreign('chat_id')->references('id')->on('chat')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chat');
    }
};
