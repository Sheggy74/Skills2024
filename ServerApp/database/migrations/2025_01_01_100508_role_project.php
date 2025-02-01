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
        Schema::create('role_project', function (Blueprint $table) {
            $table->comment('справочник ролей проекта');
            $table->id()->comment('Идентификатор роли проекта');
            $table->string('name')->comment('Наименование роли проекта');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::drop('role_project');
    }
};
