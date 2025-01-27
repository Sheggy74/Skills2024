<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserRoleResource;
use App\Models\Project;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller implements CrudController
{
    public function index(Request $request)
    {
        $data =  Project::query()->get();
        return ProjectResource::collection($data);
    }

    public function show($id, Request $request)
    {
        $data = Project::query()->find($id);
        return new ProjectResource($data);
    }

    public function create(Request $request)
    {
        $data = Project::query()->create([
            'name' => $request->name,
            'description'=>$request->description,
            'icon'=>$request->icon,
            'theme'=>$request->theme
        ]);
        $fixedJson = preg_replace('/([a-zA-Z0-9_]+)\s*:/', '"$1":', $request->users);
        $userRole=json_decode($fixedJson);
        $masUserRole=array();
        //  dump($userRole);
        foreach($userRole as $item){
            array_push($masUserRole,);
            dump();
            DB::connection('pgsql')->table('rule_project')->insert(
                ['project_id'=>$data["id"],'user_id'=>$item->id,'role_id'=>$item->role_id]
            );
        }
        
        return new ProjectResource($data);
    }

    public function update($id, Request $request)
    {
        Project::query()->find($id)->update([
            'name' => $request->name,
            'description' => $request->description,
            'icon' => $request->icon
        ]);
        $data = Project::query()->find($id);
        return new ProjectResource($data);
    }

    public function delete($id)
    {
        Project::query()->find($id)->delete();
        return 0;
    }

    public function getUserRole() {
        $user=DB::connection('pgsql')->table('users')->select('users.id','users.first_name','users.last_name',
        'users.second_name','roles.name','roles.id as role_id')->leftJoin('user_roles','user_roles.user_id','users.id')
        ->leftJoin('roles','roles.id','user_roles.role_id')->get();
        return UserRoleResource::collection($user);
    }
}
