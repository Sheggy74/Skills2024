<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Tags;
use Illuminate\Support\Facades\DB;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $id=DB::table('tags_project')->select('tags.id','tags.name')->leftJoin('tags','tags.id','tags_project.tags_id')
        ->where('tags_project.project_id',$this->id)->get();
        $selectRow=DB::table('rule_project')->select('user_id as id','role_id')->where('rule_project.project_id',$this['id'])->get();
        return [
            'id'=>$this['id'],
            'name'=>$this->name,
            'description'=>$this->description,
            'icon'=>$this->icon,
            'theme'=>$this->theme,
            'tags'=>$id,
            'selectRows'=>$selectRow,
        ];
    }
}
