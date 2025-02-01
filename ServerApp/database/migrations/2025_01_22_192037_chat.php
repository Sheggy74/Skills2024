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
        Schema::create('chat', function (Blueprint $table) {
            $table->comment('Чат задачи');
            $table->id()->comment('Идентификатор чата');
            $table->bigInteger('task_id')->nullable()->comment('Идентификатор задачи');
            $table->bigInteger('user_id')->nullable()->comment('Идентификатор пользователя');
            $table->bigInteger('project_id')->comment('Идентификатор проекта');
            $table->string('message')->comment('Сообщение');
            $table->timestamp('created_at')->nullable()->comment('Дата создания');
            $table->timestamp('updated_at')->nullable()->comment('Дата изменения');

            $table->foreign('task_id')->references('id')->on('task')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
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
