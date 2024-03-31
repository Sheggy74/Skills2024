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
        Schema::create('report_values', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->float('value');
            $table->string('conclusion');
            $table->bigInteger('experiments_id');
            $table->timestamps();
            
            $table->foreign('experiments_id')->references('id')->on('experiments');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_value');
    }
};
