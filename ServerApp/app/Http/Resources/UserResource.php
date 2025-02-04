<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\DB;

class UserResource extends JsonResource
{    
    public function toArray(Request $request): array
    {
        $topics = DB::select("
        select name 
          from topics t
          join user_topics ut on ut.topic_id = t.id
          where ut.user_id = $this->id
    ");
        return [
            'id' => $this->id,
            'firstName' => $this->first_name,
            'secondName' => $this->second_name,
            'lastName' => $this->last_name,
            // 'photoURL' => $this->photo_url,
            // 'email' => $this->email,
            'login' => $this->login,
            'role' => $this->roles && count($this->roles) > 0 ? $this->roles[0] : null,
            'position' => $this->position,
            'bossId' => $this->boss_id,
            'gender' => $this->gender,
            'prof_level' => $this->prof_level,
            'topics' => array_map(fn($item)=> $item->name,$topics)            
        ];
    }
}


