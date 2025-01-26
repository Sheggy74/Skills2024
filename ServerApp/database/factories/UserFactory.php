<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    private array $jobs = [
        "Отдел кадров", "Бухгалтерия", "Юридический отдел", "Маркетинговый отдел", "Отдел продаж", "IT-отдел", "Отдел разработки", "Отдел технической поддержки", "Логистический отдел", "Отдел закупок", "Финансовый отдел", "Производственный отдел", "Отдел качества", "Отдел исследований и разработок", "Отдел PR и коммуникаций", "Отдел по работе с клиентами", "Отдел внутреннего контроля", "Отдел безопасности", "Административный отдел", "Отдел обучения и развития"
    ];

    private array $places = [
        "Начальник отдела", "Бухгалтер", "Главный инженер", "Директор по маркетингу", "Менеджер по продажам", "Программист", "Системный администратор", "Юрист", "Координатор проекта", "Аналитик данных", "Специалист по кадрам", "Руководитель проекта", "Оператор call-центра", "Менеджер по закупкам", "Специалист по логистике", "Контент-менеджер", "Дизайнер", "Инженер-технолог", "Специалист по качеству", "Ассистент руководителя"
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'first_name' => fake()->firstName,
            'second_name' => fake()->firstName,
            'last_name' => fake()->lastName(),
            //'photo' => fake()->image(),
            'login' => fake()->unique()->userName(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'job' => $this->jobs[array_rand($this->jobs)],
            'place' => $this->places[array_rand($this->places)],
            'phone' => fake()->phoneNumber
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
