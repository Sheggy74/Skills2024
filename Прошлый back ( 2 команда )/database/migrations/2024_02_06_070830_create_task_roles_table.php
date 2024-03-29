<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTaskRolesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('task_roles', function (Blueprint $table) {
                $table->integer('task_id')->unsigned();
                $table->integer('role_id')->unsigned();
                $table->foreign('task_id')->references('id')->on('tasks')
                    ->onDelete('cascade');
                $table->foreign('role_id')->references('id')->on('roles')
                    ->onDelete('cascade');
            });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('task_roles');
    }
}
