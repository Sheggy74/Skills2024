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
        // $tool = Tool::query()->find($this->tool_id);

        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'dateCreation' => $this->created_at,
            'projectId' => $this->project_id,
            // 'userId' => $this->user_id,
            // 'ptaskId' => $this->ptask_id,
            'stateId' => $this->lastState?->state?->id ?? 0,
            'stateName' => $this->lastState?->state?->name ?? '',
            'priorityId' => $this?->priority?->id ?? 0,
            'priorityName' => $this?->priority?->name ?? '',
            // 'performers' => $this->users,
            'performer' => $this?->user,
            'deadline' => $this?->deadline->date ?? '',
            'topicId' => $this?->topic_id ?? 0,
            'topicName' => $this?->topics_name ?? '',
        ];
    }
}
