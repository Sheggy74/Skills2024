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

       $this->call([
           UserSeeder::class,
           ToolSeeder::class,
           ExperimentSeeder::class,
           ScriptSender::class,
           ReportSeeder::class,
           ReportValuesSeeder::class,
           DesertsSeeder::class,
           ProjectSeeder::class,
           RuleProjectSeeder::class,
           StageTaskSeeder::class,
           TaskSeeder::class,
           PerformerSeeder::class,
           ChatSeeder::class

       ])
;

    }
}
