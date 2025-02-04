<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\StageTask;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

<<<<<<< HEAD
       $this->call([
           RoleProjectSeeder::class,
           ToolSeeder::class,
           ExperimentSeeder::class,
           ScriptSender::class,
           ReportSeeder::class,
           ReportValuesSeeder::class,
           ProjectSeeder::class,
           RuleProjectSeeder::class,
           StateSeeder::class,
           PrioritySeeder::class,
           TaskSeeder::class,
           PerformerSeeder::class,
           ChatSeeder::class,
           StateTaskSeeder::class,
           

       ])
;

=======
        $this->call([
            UserSeeder::class,
            RoleProjectSeeder::class,
            ReportSeeder::class,
            ProjectSeeder::class,
            RuleProjectSeeder::class,
            StateSeeder::class,
            PrioritySeeder::class,
            TaskSeeder::class,
            PerformerSeeder::class,
            ChatSeeder::class,
            StateTaskSeeder::class,
        ]);
>>>>>>> 06bc8f9a0864f94eead87ec004f1f339d96d6224
    }
}
