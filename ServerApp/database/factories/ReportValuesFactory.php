<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ReportValues>
 */
class ReportValuesFactory extends Factory
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
            'value'=>fake()->randomFloat(2, 0,10),
            'conclusion'=>fake()->sentence(2),
            'experiments_id'=>1,
        ];
    }
}
