<?php

namespace Database\Seeders;

use App\Models\Priority;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PrioritySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Priority::factory()->create([
            'name'=>'низкий'
        ]);
        Priority::factory()->create([
            'name'=>'средний'
        ]);
        Priority::factory()->create([
            'name'=>'высокий'
        ]);
        Priority::factory()->create([
            'name'=>'крайне важно'
        ]);
    }
}
