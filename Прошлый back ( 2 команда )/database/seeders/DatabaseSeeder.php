<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        \App\Models\User::factory(10)->create();

        $roles = [
            ['name' => 'Общая', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Бухгалтер', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Аналитик', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->insert($role);
        }

        $statuses = [
            ['name' => 'Согласовано руководителем', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Заявка отклонена', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];

        foreach ($statuses as $status) {
            DB::table('statuses')->insert($status);
        }

        $types = [
            ['name' => 'Файловый ресурс', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'ПО', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Web-ресурс', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];

        foreach ($types as $type) {
            DB::table('task_types')->insert($type);
        }

        $confidences = [
            ['name' => 'Несекретно', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Секретно', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['name' => 'Совершенно секретно', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];

        foreach ($confidences as $confidence) {
            DB::table('task_confidences')->insert($confidence);
        }

        $tasks = [
            ['mnemocode' => 'AA1', 'name' => '1С Бухгалтерия', 'task_type_id' => 2, 'task_confidence_id' => 1, 'description' => '1С Бухгалтерия', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
            ['mnemocode' => 'BB1', 'name' => 'Личный кабинет', 'task_type_id' => 3, 'task_confidence_id' => 1, 'description' => 'ЛК', 'created_at' => Carbon::now(), 'updated_at' => Carbon::now()],
        ];

        foreach ($tasks as $task) {
            DB::table('tasks')->insert($task);
        }



        \App\Models\TaskRequest::factory(10)->create();
    }
}
