<?php

namespace App\Http\Resources;

use App\Models\Tool;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $tool = Tool::query()->find($this->tool_id);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'dateCreation' => $this->date_create,
            // 'projectId' => $this->date,
            // 'userId' => $this->user_id,
            // 'ptaskId' => $this->ptask_id,
            // 'priorityId' => $this->priority_id,
        ];
    }
}
