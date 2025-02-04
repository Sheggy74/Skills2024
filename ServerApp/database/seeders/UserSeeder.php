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
        $user = User::factory()->create([
            'id' => 1,
            'login' => 'admin',
            'password' => bcrypt('admin')
        ]);

        $role = Role::query()->create([
            'name' => 'admin',
            'title' => 'Администратор',
            'starting_url' => '/admin',
            'image' => 'assets/admin.webp'
        ]);

        UserRole::query()->create([
            'user_id' => $user->id,
            'role_id' => $role->id
        ]);

        // $user = User::factory()->create([
        //     'email' => 'manager@example.com',
        //     'login' => 'manager',
        //     'password' => bcrypt('manager')
        // ]);

        // $role = Role::query()->create([
        //     'name' => 'manager',
        //     'title' => 'Руководитель',
        //     'starting_url' => '/manager',
        //     'image' => 'assets/manager.webp'
        // ]);

        // UserRole::query()->create([
        //     'user_id' => $user->id,
        //     'role_id' => $role->id
        // ]);

        // $user = User::factory()->create([
        //     'email' => 'user@example.com',
        //     'login' => 'user',
        //     'password' => bcrypt('user')
        // ]);

        // $role = Role::query()->create([
        //     'name' => 'user',
        //     'title' => 'Пользователь',
        //     'starting_url' => '/user',
        //     'image' => 'assets/user.webp'
        // ]);

        // UserRole::query()->create([
        //     'user_id' => $user->id,
        //     'role_id' => $role->id
        // ]);


    }
}
