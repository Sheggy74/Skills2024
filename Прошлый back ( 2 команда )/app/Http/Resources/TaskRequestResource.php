<?php

namespace App\Http\Resources;

use App\Models\Task;
use App\Models\User;
use App\Models\Status;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskRequestResource extends JsonResource
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
            'task' => $this->task->description,
            'task_id' => $this->task_id,
            'user' => $this->user->firstname.' '.$this->user->lastname,
            'user_id' => $this->user_id,
            'status' => $this->status->name,
            'status_id' => $this->status_id,
            'comment' => $this->comment
        ];

    }
}
