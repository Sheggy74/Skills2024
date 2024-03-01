<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Role;
use App\Models\User;
use App\Models\UserRole;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

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
            'starting_url' => '/lab'
        ]);

        UserRole::query()->create([
            'user_id' => $user->id,
            'role_id' => $role->id
        ]);
;

    }
}
