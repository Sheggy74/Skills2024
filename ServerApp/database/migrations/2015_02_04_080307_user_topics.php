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
        Schema::create('user_topics',function (Blueprint $table){
            $table->comment('Тематики пользователей');
            $table->id()->comment('Идентификатор тематики пользователя');
            $table->bigInteger('user_id')->comment('Идентификатор пользователя');
            $table->string('topic_id')->comment('Идентификатор тематики');
            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_topics');
    }
};
