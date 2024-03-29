<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
//php artisan make:migration scripts
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('scripts_copy',function (Blueprint $table){
            $table->id();
            $table->string('textscript');
            $table->string('result');
            $table->bigInteger('scriptstate_id');
            $table->bigInteger('scripttype_id');
            $table->foreign('scriptstate_id')->references('id')->on('scriptstate');
            $table->foreign('scripttype_id')->references('id')->on('scripttype');

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scripts');

    }
};
