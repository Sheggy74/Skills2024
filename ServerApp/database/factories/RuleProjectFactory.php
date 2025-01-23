<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RuleProject>
 */
class RuleProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'role_id'=>2,
            'project_id'=>Project::query()->inRandomOrder()->first()->id,
            'user_id'=>User::query()->inRandomOrder()->first()->id
        ];
    }
}
