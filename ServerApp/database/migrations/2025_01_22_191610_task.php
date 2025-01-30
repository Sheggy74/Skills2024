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
            $table->comment('Задача');
            $table->id()->comment('Идентификатор задачи');
            $table->string('name')->comment('Наименование задачи');
            $table->string('description')->nullable()->comment('Описание задачи');
            $table->date('date_create')->comment('Дата создания');
            $table->bigInteger('project_id')->comment('Идентификатор проекта');
            $table->bigInteger('user_id')->nullable()->comment('Идентификатор пользователя');
            $table->bigInteger('priority_id')->nullable()->comment('Идентификатор приоритета');
            $table->integer('ptask_id')->nullable()->comment('Идентификатор родителя задачи');
            $table->timestamp('created_at')->nullable()->comment('Дата создания');
            $table->timestamp('updated_at')->nullable()->comment('Дата изменения');

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('priority_id')->references('id')->on('priority')->onDelete('cascade');
            $table->foreign('project_id')->references('id')->on('project')->onDelete('cascade');
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
