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
            $table->bigInteger('id')->unique()->comment('Идентификатор пользователя');
            $table->string('first_name')->nullable()->comment('Имя пользователя');
            $table->string('second_name')->nullable()->comment('Фамилия пользователя');
            $table->string('last_name')->nullable()->comment('Отчество пользователя');
            $table->string('photo_url')->nullable()->comment('Путь до фото');
            $table->string('login')->unique()->comment('Логин');                        
            $table->string('password')->comment('Пароль');
            $table->bigInteger('boss_id')->nullable()->comment('Идентификатор руководителя');
            $table->string('gender')->nullable()->comment('Пол');
            $table->date('birthday')->nullable()->comment('Дата рождения');
            $table->string('position')->nullable()->comment('Должность');
            $table->integer('prof_level')->nullable()->comment('Проф. уровень');
            $table->boolean('can_add')->nullable()->comment('Пользователь может создавать задачи');
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
