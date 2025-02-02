<?php

namespace App\Http\Controllers;

use Carbon\Exceptions\EndLessPeriodException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\FullCalendarRecource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserRoleResource;
use App\Models\Notifications;
use App\Models\Project;
use App\Models\RoleProject;
use App\Models\RuleProject;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

class ProjectController extends Controller implements CrudController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    public function index(Request $request)
    {
        if (Auth::user()->login == 'admin') {
            $data =  Project::query()->get();
        } else {
            $idUser = Auth::user()->id;
            $data = Project::query()->leftJoin('rule_project', 'rule_project.project_id', 'project.id')
                ->where('rule_project.user_id', $idUser)->get();
        }
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
            'description' => $request->description,
            'icon' => $request->icon,
            'theme' => $request->theme
        ]);

        $jsonString = stripslashes($request->users);
        $userRole = json_decode($jsonString, true);

        foreach ($userRole as $item) {
            RuleProject::query()->create(
                ['project_id'=>$data->id,'user_id'=>$item["id"],'role_id'=>$item["role"]]

            );
            $name=$item["role"]==1?'менеджером':'исполнителем';
            Notifications::query()->create([
                'user_id'=>$item["user_id"],
                'message'=>"Вы назначены ".$name." проекта \"".$request->name."\"",
                'is_read'=>false
            ]);
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
        $jsonString = stripslashes($request->users);
        $userRole = json_decode(trim($jsonString, '"'), true);

        // dd($userRole);
        // $userRole = json_decode($request->users);
        // if(is_string($request->users)){
        //     $fixedJson = preg_replace('/([a-zA-Z0-9_]+)\s*:/', '"$1":', $request->users);
        //     // dump($fixedJson);
        //     $userRole=json_decode($fixedJson);
        // }else{
        //     $userRole=$request->users;
        // }

        $newUserRule = array_map(function ($item) {
            return $item['id'];
        }, $userRole);

        $oldUserRule = RuleProject::query()->where('project_id', $id)->get()->toArray();
        $newRule = ProjectController::getUniqueUsersById($userRole, $oldUserRule);
        $oldRule = ProjectController::getUniqueUsersById($oldUserRule, $userRole);
        // dd($newRule);
        foreach ($newRule as $item) {
            RuleProject::query()->create(
                ['project_id'=>$data->id,'user_id'=>$item["id"],'role_id'=>$item["role"]]
            );
            $name=$item["role"]==1?'менеджером':'исполнителем';
            Notifications::query()->create([
                'user_id'=>$item["id"],
                'message'=>"Вы назначены ".$name." проекта \"".$request->name."\"",
                'is_read'=>false
            ]);
        }

        foreach ($oldRule as $item) {
            RuleProject::query()->find($item["id"])->delete();
            Notifications::query()->create([
                'user_id' => $item["user_id"],
                'message' => "Вы сняты с проекта \"" . $request->name . "\"",
                'is_read' => false
            ]);
        }
        return new ProjectResource($data);
    }

    public function delete($id)
    {
        Project::query()->find($id)->delete();
        return 0;
    }

    public function getUserRole()
    {
        // $user=DB::connection('pgsql')->table('users')->select('users.id','users.first_name','users.last_name',
        // 'users.second_name','roles.name','roles.id as role_id')->leftJoin('user_roles','user_roles.user_id','users.id')
        // ->leftJoin('roles','roles.id','user_roles.role_id')->get();

        $user = DB::connection('pgsql')->table('users')->select(
            'users.id',
            'users.first_name',
            'users.last_name',
            'users.second_name'
        )->get();
        return UserRoleResource::collection($user);
    }

    public function getUserRolePrId($id) {
        // $user=DB::connection('pgsql')->table('users')->select('users.id','users.first_name','users.last_name',
        // 'users.second_name','roles.name','roles.id as role_id')->leftJoin('user_roles','user_roles.user_id','users.id')
        // ->leftJoin('roles','roles.id','user_roles.role_id')->get();

        // $user=DB::connection('pgsql')->table('users')->select('users.id','users.first_name','users.last_name',
        // 'users.second_name','rule_project.role_id')
        // ->leftJoin('rule_project','rule_project.user_id','users.id')->where('rule_project.project_id',$id)
        // ->get();

        $user = DB::connection('pgsql')
        ->table('users')
        ->select('users.id', 
        'users.first_name','users.last_name',
        'users.second_name', 
                 'rule_project.role_id')
        ->leftJoin('rule_project', 'rule_project.user_id', '=', 'users.id')
        ->where('rule_project.project_id', $id)  // Фильтруем по project_id
        ->orWhereNull('rule_project.role_id')   // Включаем пользователей без роли
        ->get();

        // return $user;
        return UserRoleResource::collection($user);
    }

    public function getRuleProject($id){
        $user=DB::connection('pgsql')->table('users')->select('users.id','users.first_name','users.last_name',
        'users.second_name','roles.name','roles.id')->leftJoin('rule_project','rule_project.user_id','users.id')
        ->leftJoin('roles','roles.id','rule_project.role_id')->where('rule_project.project_id',$id)->get();

        return UserRoleResource::collection($user);
    }

    function getUniqueUsersById($array1, $array2)
    {
        // Массив с id пользователей из первого массива
        $ids1 = array_map(function ($user) {
            return $user['id'];
        }, $array1);
        // Массив с id пользователей из второго массива
        $ids2 = array_map(function ($user) {
            return $user['id'];
        }, $array2);

        // Находим уникальные id из первого массива
        $uniqueIds1 = array_diff($ids1, $ids2);

        // Извлекаем пользователей с уникальными id
        $uniqueUsers1 = array_filter($array1, function ($user) use ($uniqueIds1) {
            return in_array($user['id'], $uniqueIds1);
        });

        return $uniqueUsers1;
    }


    function getTasksProject($id) {
        $retVal=Task::query()->leftJoin('time_job','time_job.task_id','task.id')
            ->leftJoin('deadline','deadline.task_id','task.id')->where('task.project_id',$id)->get();
        return FullCalendarRecource::collection($retVal);
    }   
    /**
     * Назначение пользователя на проект
     * */
    public function setUserOnProject(Request $request)
    {
        if ($request->project_id == null || $request->user_id == null)
            return response()->json(['message' => 'Укажите пользователя и проект!'], 400);
        RuleProject::query()->create(
            ['project_id' => $request->project_id, 'user_id' => $request->user_id, 'role_id' => 2]
        );
        Notifications::query()->create([
            'user_id' => $request->user_id,
            'message' => "Вы назначены на проект \"" . $request->name . "\"",
            'is_read' => false
        ]);
        return response(['message' => 'Пользователь успешно назначен на проект!'], 200);
    }

}
