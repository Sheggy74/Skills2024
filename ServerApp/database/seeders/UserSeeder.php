<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory(10)->create();

        $user = User::factory()->create([
            'email' => 'test@example.com',
            'login' => 'admin',
            'password' => bcrypt('admin')
        ]);

        $role = Role::query()->create([
            'name' => 'admin',
            'starting_url' => '/admin'
        ]);

        UserRole::query()->create([
            'user_id' => $user->id,
            'role_id' => $role->id
        ]);

        $user = User::factory()->create([
            'email' => 'user@example.com',
            'login' => 'user',
            'password' => bcrypt('user')
        ]);

        $role = Role::query()->create([
            'name' => 'user',
            'starting_url' => '/experiments'
        ]);

        UserRole::query()->create([
            'user_id' => $user->id,
            'role_id' => $role->id
        ]);

        $role = Role::query()->create([
            'name' => 'manager',
            'starting_url' => '/manager'
        ]);
        
        UserRole::query()->create([
            'user_id' => $user->id,
            'role_id' => $role->id
        ]);
    }
}
