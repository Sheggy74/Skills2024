<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Psy\Shell;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('state_task',function (Blueprint $table){
            $table->comment('Справочник состояния задач');
            $table->id()->comment('Идентификатор состояния');
            $table->string('name')->comment('Наименование состояния');
            $table->bigInteger('project_id')->nullable()->comment('Идентификатор проекта');

            $table->foreign('project_id')->references('id')->on('project')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('state_task');
    }
};
