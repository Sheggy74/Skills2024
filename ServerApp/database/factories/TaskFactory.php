<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Priority;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'=>fake()->word(),
            'description'=>fake()->sentence(3),
            'date_create'=>fake()->date(),
            'project_id'=>Project::query()->inRandomOrder()->first()->id,
            'user_id'=>User::query()->inRandomOrder()->first()->id,
            'priority_id'=>Priority::query()->inRandomOrder()->first()->id,
        ];
    }
}
