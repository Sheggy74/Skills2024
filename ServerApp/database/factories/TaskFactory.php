<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Priority;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

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
            'name' => fake()->randomElement(['Прочитать документы','Отчитаться в бухшалтерии','Подсчет убытков','Проанализировать прибыль','Пойти на совещание']),
            'description' => fake()->randomElement(['Не опаздывать','Взять с собой документы','Замени форму в документе','Все значения переданы секретарю','Убери 1 лист','Заведи всех сотрудников']),
            'date_create' => fake()->date(),
            'user_id' => User::query()->inRandomOrder()->first()->id,
            'priority_id' => Priority::query()->inRandomOrder()->first()->id,
            'created_at' => Carbon::parse(fake()->dateTimeBetween('-365 days', 'now'))->setTime(rand(9, 18), rand(0, 59), rand(0, 59)),
        ];
    }
}
