<?php

namespace Database\Factories;

use App\Models\Tool;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class ExperimentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->sentence(3),
            'number' => '123ZY-244657',
            'date' => fake()->date(),
            'user_id' => User::query()->inRandomOrder()->first()->id,
            'tool_id' => Tool::query()->inRandomOrder()->first()->id,
        ];
    }
}
