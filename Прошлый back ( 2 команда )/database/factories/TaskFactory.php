<?php

namespace Database\Factories;

use App\Models\Status;
use App\Models\TaskConfidence;
use App\Models\TaskType;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->text(10),
            'type_id' => TaskType::all()->random()->id,
            'confidence_mark_id' => TaskConfidence::all()->random()->id,
            'mnemocode' => $this->faker->text(10),
            'description' => $this->faker->text(20),
            'path' =>  $this->faker->url(),
        ];
    }
}
