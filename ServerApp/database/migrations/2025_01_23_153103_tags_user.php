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
        Schema::create('tags_user',function (Blueprint $table){
            $table->comment('Теги пользователя');
            $table->bigInteger('tags_id')->comment('Идентификатор тега');
            $table->bigInteger('user_id')->comment('Идентификатор пользователя');

            $table->foreign('tags_id')->references('id')->on('tags')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags_user');
    }
};
