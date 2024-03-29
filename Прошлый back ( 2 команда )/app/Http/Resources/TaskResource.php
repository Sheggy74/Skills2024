<?php

namespace App\Http\Resources;

use App\Models\Task;
use App\Models\TaskType;
use App\Models\TaskConfidence;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {

            return [
            'id' => $this->id,
            'name' => $this->name,
            'mnemocode' => $this->mnemocode,
            'description' => $this->description,
            'task_type_id' => $this->task_type_id,
            'task_confidence_id' => $this->task_confidence_id,
            'task_type' => $this->task_type->name,
            'task_confidence' => $this->task_confidence->name,
        ];

    }
}
