<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class NotificationsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $date = new \DateTime($this->created_at);

        // Форматируем дату в нужный формат
        $formattedDate = $date->format('H:i:s d.m.Y');
        return [
            'id'=>$this->id,
            'user_id'=>$this->user_id,
            'message'=>$this->message,
            'is_read'=>$this->is_read,
            'created_at'=>$formattedDate
        ];
    }
}
