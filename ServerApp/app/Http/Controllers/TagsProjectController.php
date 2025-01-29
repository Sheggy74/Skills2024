<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Interface\CrudController;
use App\Models\TagsProject;
use App\Http\Resources\TagsProjectResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TagsProjectController extends Controller implements CrudController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function index(Request $request)
    {
        $data =  TagsProject::query()->get();
        return TagsProjectResource::collection($data);
    }

    public function show($project_id, Request $request)
    {
        $data = TagsProject::query()->where('project_id',$project_id)->get();
        return new TagsProjectResource($data);
    }

    public function create(Request $request)
    {
        if(is_string($request->mas)){
            $val=json_decode(preg_replace('/([a-zA-Z0-9_]+)\s*:/', '"$1":', $request->mas));
        }else{
            $val=$request->mas;
        }
        $mas=array();
        foreach($val as $item){
            DB::table('tags_project')->insert([
                ['project_id'=>$item['project_id'],'tags_id'=>$item['tags_id']]
            ]);
        }
        return 1;
    }

    public function update($project_id, Request $request)
    {
        TagsProject::query()->where()->update([
            'project_id' => $request->project_id,
            'tags_id'=>$request->tags_id
        ]);
        $data = TagsProject::query()->where('project_id',$project_id);
        return new TagsProjectResource($data);
    }

    public function delete($project_id)
    {
        $project_id=explode($project_id);
        TagsProject::query()->whereIn('project_id',$project_id)->delete();
        return 0;
    }
}
