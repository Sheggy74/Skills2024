<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\RoleProject;

class RoleProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RoleProject::create([
            'name'=>'менеджер'
        ]);
        RoleProject::create([
            'name'=>'исполнитель'
        ]);
    }
}
