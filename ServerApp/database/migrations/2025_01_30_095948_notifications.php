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
        Schema::create('notifications', function (Blueprint $table) {
            $table->comment('Уведомления');
            $table->id()->comment('Идентификатор уведомения');
            $table->bigInteger('user_id')->comment('Идентификатор пользователя');
            $table->string('message')->comment('Сообщение уведомления');
            $table->boolean('is_read')->comment('Прочитано?');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('notifications');
    }
};
