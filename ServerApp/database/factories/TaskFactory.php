<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\StageTask;
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
            'project_id'=>Project::query()->inRandomOrder()->first()->id,
            'user_id'=>User::query()->inRandomOrder()->first()->id,
            'stage_task_id'=>StageTask::query()->inRandomOrder()->first()->id,
            'date_start'=>now(),
            'date_end'=>now()->addDays(random_int(1,5)),
        ];
    }
}
