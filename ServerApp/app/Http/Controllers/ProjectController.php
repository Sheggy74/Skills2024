<?php

namespace App\Http\Controllers;

use Carbon\Exceptions\EndLessPeriodException;
use Illuminate\Http\Request;
use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserRoleResource;
use App\Models\Project;
use App\Models\RuleProject;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller implements CrudController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
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

        $jsonString = stripslashes($request->users);
        $userRole = json_decode($jsonString, true);
        foreach($userRole as $item){
            // dump( $item);
            RuleProject::query()->create(
                ['project_id'=>$data->id,'user_id'=>$item["id"],'role_id'=>$item["role_id"]]
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
        if(is_string($request->users)){
            $fixedJson = preg_replace('/([a-zA-Z0-9_]+)\s*:/', '"$1":', $request->users);
            dump($fixedJson);
            $userRole=json_decode($fixedJson);
        }else{
            $userRole=$request->users;
        }
        
        $masUserRole=array();

        foreach($userRole as $item){
            array_push($masUserRole);
            RuleProject::query()->create(
                ['project_id'=>$data->id,'user_id'=>$item["id"],'role_id'=>$item["role_id"]]
            );
        }
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

    public function getRuleProject($id){
        $user=DB::connection('pgsql')->table('users')->select('users.id','users.first_name','users.last_name',
        'users.second_name','roles.name','roles.id as role_id')->leftJoin('rule_project','rule_project.user_id','users.id')
        ->leftJoin('roles','roles.id','rule_project.role_id')->where('rule_project.project_id',$id)->get();
        return UserRoleResource::collection($user);
    }
}
