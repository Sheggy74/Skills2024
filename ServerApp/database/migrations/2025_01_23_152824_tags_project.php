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
        Schema::create('tags_project',function (Blueprint $table){
            $table->comment('Теги проекта');
            $table->bigInteger('tags_id')->comment('Идентификатор тега');
            $table->bigInteger('project_id')->comment('Идентификатор проекта');

            $table->foreign('tags_id')->references('id')->on('tags')->onDelete('cascade');
            $table->foreign('project_id')->references('id')->on('project')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags_project');
    }
};
