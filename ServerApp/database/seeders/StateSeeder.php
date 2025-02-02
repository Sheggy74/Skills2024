<?php

namespace Database\Seeders;

use App\Models\State;
use App\Models\StateTask;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        State::factory()->create([
            'name'=>'новые'
        ]);
        State::factory()->create([
            'name'=>'в работе'
        ]);
        State::factory()->create([
            'name'=>'готово'
        ]);
    }
}
