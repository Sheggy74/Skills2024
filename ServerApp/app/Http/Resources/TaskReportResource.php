<?php

namespace App\Http\Resources;

use App\Models\ReportTask;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskReportResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $percent=ReportTask::where('task_id',$this->task_id)->sum('percent');
        return [
            // 'id'=>$this->id,
            // 'task_id'=>$this->task_id,
            // 'name'=>$this->name,
            // 'date'=>$this->date,
            // 'description'=>$this->description,
            // 'percent'=>$this->percent,
            // 'oldPercent'=>$percent

            'id'=>null,
            'task_id'=>$this->task_id,
            'name'=>$this->name,
            'date'=>null,
            'description'=>null,
            'percent'=>null,
            'oldPercent'=>$percent
        ];
    }
}
