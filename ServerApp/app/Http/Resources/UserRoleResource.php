<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserRoleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fio'=>$this->second_name." ". substr($this->first_name,1,1)."".substr($this->last_name,1,1),
            'role'=>$this->name?$this->name:'user',
            'role_id'=>$this->role_id?$this->role_id:2
        ];
    }
}
