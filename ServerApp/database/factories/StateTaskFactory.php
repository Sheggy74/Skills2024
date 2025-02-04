<?php

namespace Database\Factories;

use App\Models\State;
use App\Models\StateTask;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TimeJob>
 */
class StateTaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            // 'date_start'=>now(),
            // 'date_end'=>date_add(now(),date_interval_create_from_date_string(random_int(1,3)."days")),
            'task_id' => Task::query()->inRandomOrder()->first()->id,
            // 'user_id'=>User::query()->inRandomOrder()->first()->id,
            'state_id' => State::query()->inRandomOrder()->first()->id,
            'created_at' => Carbon::parse(fake()->dateTimeBetween('-7 days', 'now'))->setTime(rand(9, 18), rand(0, 59), rand(0, 59)),
        ];
    }
}
