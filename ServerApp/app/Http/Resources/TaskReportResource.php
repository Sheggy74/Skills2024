<?php

namespace App\Http\Resources;

use App\Models\ReportWork;
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
        $percent=ReportWork::where('task_id',$this->id)->sum('percent');
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'report_id'=>$this->report_id,
            'date'=>$this->date,
            'description'=>$this->description,
            'percent'=>$this->percent,
            'oldPercent'=>$percent
            // 'task'=>
        ];
    }
}
