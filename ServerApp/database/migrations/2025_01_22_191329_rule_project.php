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
        Schema::create('rule_project',function (Blueprint $table){
            $table->comment('Доступ к проекту');
            $table->id()->comment('Идентификатор доступа');
            $table->bigInteger('project_id')->comment('Идентификатор проекта');
            $table->bigInteger('user_id')->comment('Идентификатор пользователя');
            $table->bigInteger('role_id')->comment('Идентификатор роли');
            $table->timestamp('created_at')->nullable()->comment('Дата создания');
            $table->timestamp('updated_at')->nullable()->comment('Дата изменения');

            $table->foreign('project_id')->references('id')->on('project')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
            $table->foreign('role_id')->references('id')->on('role_project')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rule_projet');
    }
};
