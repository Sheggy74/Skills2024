<?php

namespace Database\Seeders;

use App\Models\StateTask;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StateTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StateTask::factory()->create([
            'name'=>'новые'
        ]);
        StateTask::factory()->create([
            'name'=>'в работе'
        ]);
        StateTask::factory()->create([
            'name'=>'готово'
        ]);
    }
}
