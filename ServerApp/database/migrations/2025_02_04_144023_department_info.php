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
        Schema::create('department_info',function (Blueprint $table){
            $table->comment('Информация о подразделении');
            $table->string('name')->nullable()->comment('Наименование подразделения');
            $table->integer('emp_count')->comment('Количество работников');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('department_info');
    }
};
