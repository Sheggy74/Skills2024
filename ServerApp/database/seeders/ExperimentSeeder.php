<?php

namespace Database\Seeders;

use App\Models\Experiment;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ExperimentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Experiment::factory(10)->create();
    }
}
