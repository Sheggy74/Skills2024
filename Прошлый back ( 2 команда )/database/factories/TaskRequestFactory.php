<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use App\Models\Status;
use Illuminate\Database\Eloquent\Factories\Factory;

class TaskRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'task_id' => Task::all()->random()->id,
            'user_id' => User::all()->random()->id,
            'status_id' => Status::all()->random()->id,
            'comment' => $this->faker->text(128),
        ];
    }
}
