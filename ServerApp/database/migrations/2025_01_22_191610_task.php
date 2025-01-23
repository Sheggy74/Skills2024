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
        Schema::create('task',function (Blueprint $table){
            $table->id();
            $table->string('name');
            $table->string('description');
            $table->date('date_create');
            $table->bigInteger('project_id');
            $table->bigInteger('user_id');
            $table->bigInteger('priority_id');
            $table->integer('ptask_id')->nullable();
            $table->timestamp('created_at')->nullable();
            $table->timestamp('updated_at')->nullable();

            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('priority_id')->references('id')->on('priority');
            $table->foreign('project_id')->references('id')->on('project');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('task');
    }
};
