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
        Schema::create('files',function (Blueprint $table){
            $table->id();
            $table->string('name');
            $table->binary('data');
            $table->string('type');
            $table->string('size');
            $table->bigInteger('chat_id');

            $table->foreign('chat_id')->references('id')->on('chat');
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
