<?php

namespace Database\Seeders;

use App\Models\StageTask;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StageTaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        StageTask::factory()->create([
            'name'=>'новые'
        ]);
        StageTask::factory()->create([
            'name'=>'в работе'
        ]);
        StageTask::factory()->create([
            'name'=>'готово'
        ]);
    }
}
