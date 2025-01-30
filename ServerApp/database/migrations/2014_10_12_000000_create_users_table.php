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
        Schema::create('users', function (Blueprint $table) {
            $table->comment('Пользователи');
            $table->id()->comment('Идентификатор пользователя');
            $table->string('first_name')->nullable()->comment('Имя пользователя');
            $table->string('second_name')->nullable()->comment('Фамилия пользователя');
            $table->string('last_name')->nullable()->comment('Отчество пользователя');
            $table->string('photo_url')->nullable()->comment('Путь до фото');
            $table->string('login')->unique()->comment('Логин');
            $table->string('email')->unique()->comment('Почта');
            $table->timestamp('email_verified_at')->nullable()->comment('Дата проверки почты');
            $table->string('password')->comment('Пароль');
            $table->string('place')->nullable()->comment('Профессия');
            $table->string('job')->nullable()->comment('Место работы');
            $table->string('phone')->nullable()->comment('Телефон');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
