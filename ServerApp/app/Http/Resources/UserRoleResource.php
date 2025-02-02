<?php

namespace App\Http\Resources;

use App\Models\RoleProject;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserRoleResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        $role=RoleProject::query()->select('role_id as id','name')->leftJoin('rule_project','rule_project.role_id','role_project.id')
            ->where('user_id',$this->id)->first();
        return [
            'id' => $this->id,
            'fio'=>$this->second_name." ". substr($this->first_name,1,1)."".substr($this->last_name,1,1),
            'role_id'=>2
            // 'role'=>$this->name?$this->name:'user',
            // 'role_id'=>$this->role_id?$this->role_id:2
        ];
    }
}
