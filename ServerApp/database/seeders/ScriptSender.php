<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\ScriptType;
use App\Models\Script;
use App\Models\ScriptState;
//php artisan make:seeder ScriptSender
class ScriptSender extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $scriptstate = ScriptState::query()->create([
            'id' => 1,
            'state' => 'Обработан',
        ]);
        $scriptstate = ScriptState::query()->create([
            'id' => 2,
            'state' => 'Ошибка',
        ]);

        $scripttype = ScriptType::query()->create([
            'id' => 0,
            'scripttype' => 'SQL',
        ]);
        $scripttype = ScriptType::query()->create([
            'id' => 1,
            'scripttype' => 'PHP',
        ]);
        $scripttype = ScriptType::query()->create([
            'id' => 2,
            'scripttype' => 'JavaScript',
        ]);
    }
}
