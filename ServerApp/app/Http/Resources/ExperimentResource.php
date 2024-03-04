<?php

namespace App\Http\Resources;

use App\Models\Tool;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ExperimentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $tool = Tool::query()->find($this->tool_id);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'number' => $this->number,
            'date' => $this->date,
            'user' => new UserResource(User::query()->find($this->user_id)),
            'tool' => [
                'id' => $tool->id,
                'name' => $tool->name
            ]
        ];
    }
}
