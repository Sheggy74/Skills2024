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
        Schema::create('roles', function (Blueprint $table) {
            $table->comment('Роли');
            $table->id()->comment('Идентификатор роли');
            $table->string('name')->comment('Наименование роли');
            $table->string('title')->comment('Полное имя роли');
            $table->string('starting_url')->comment('Начальный путь');
            $table->string('image')->comment('Путь к фото');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
