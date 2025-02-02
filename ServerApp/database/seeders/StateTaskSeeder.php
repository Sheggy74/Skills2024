<?php

namespace Database\Seeders;

use App\Models\StateTask;
use App\Models\TimeJob;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StateTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StateTask::factory(5)->create();
    }
}
