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
        Schema::create('project',function (Blueprint $table){
            $table->comment('Проект');
            $table->id()->comment('Идентификатор проекта');
            $table->string('name')->comment('Наименование проекта');
            $table->string('description')->nullable()->comment('Описание проекта');
            $table->string('icon')->nullable()->comment('Иконка проекта');
            $table->string('theme')->nullable()->comment('Тема иконки');
            $table->timestamp('created_at')->nullable()->comment('Дата создания');
            $table->timestamp('updated_at')->nullable()->comment('Дата изменения');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('project');
    }
};
