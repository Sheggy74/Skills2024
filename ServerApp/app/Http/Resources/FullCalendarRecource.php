<?php

namespace App\Http\Resources;

use DateTime;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class FullCalendarRecource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $deadline = new DateTime($this->date);
        $formattedDate = $deadline->format('Y-m-d');

        return [
            'title'=>$this->name,
            'description'=>$this->description,
            'start'=>$this->date_start,
            'end'=>$this->date_end,
            'extendedProps'=>array(
                'deadline'=>$formattedDate
            )
            
        ];
    }
}
