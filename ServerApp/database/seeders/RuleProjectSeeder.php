<?php

namespace Database\Seeders;

use App\Models\RuleProject;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RuleProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RuleProject::factory(15)->create();
    }
}
