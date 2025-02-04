<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TopicTaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $topic=DB::select( 'select string_agg(s.name,'/') from (
            with recursive cte as(
            select topics.id,topics.upper_level,topics.name from topics
            where upper_level is null
            union all
            select topics.id,topics.upper_level,topics.name from topics,cte 
            where topics.upper_level=cte.id
            )select * from cte ) s)');
        return [
            "name"=>$this->name,
            "fio"=>$this->first_name." ".$this->last_name,
            'date'=>$this->created_at,
            'topic'=>'ff'
        ];
    }
}