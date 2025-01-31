<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Models\Task;
use App\Models\Project;
use App\Models\Priority;
use App\Http\Resources\TaskResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserRoleResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class WorkspaceController extends Controller
{

    public function showTasksForProject(Request $request, $id) {
        $tasks = Task::where('project_id', '=', $id)->OrderBy("id")->get();
        return TaskResource::collection($tasks);
    }

    public function editTask(Request $request, $id) {
        $task = Task::query()->find($id)->update([
            'name'=>$request->name,
            'description'=>$request->description,
            'user_id'=>$request->executorId
        ]);
    }

    public function createTask(Request $request)
    {
        $date = Carbon::now()->format('Y-m-d');
        $data = Task::query()->create([
            'name' => $request->name,
            'description' => $request->description,
            'project_id' => 7,
            'user_id' => null,
            'priority_id' => $request->priorityId,
            'date_create' => $request->dateCreation,
            // 'ptask_id' => ,
        ]);
        // return new Task::collection($data);
    }

    public function deleteTask(Request $request, $id)
    {
        Task::query()->find($id)->delete();
        return 0;
    }

    public function showProjectData(Request $request, $id) {
        $data = Project::query()->find($id);
        return $data;
    }

    public function showPriority(Request $request) {
        $data = Priority::get();
        return $data;
    }

    public function showProjectUser(Request $request, $id) {
        $data = DB::connection('pgsql')->table("rule_project")->where("project_id", $id)
        ->leftJoin("roles", "roles.id", "rule_project.role_id")
        ->leftJoin("users", "users.id", "rule_project.user_id")
        ->select("users.id", "users.first_name", "users.second_name", "users.last_name", "roles.title as name", "roles.id as role_id")
        ->get();
        // return $data;
        return UserRoleResource::collection($data);
    }

    public function showExecutorTask(Request $request, $id) {
        $data = DB::connection('pgsql')->table("users")
        ->where('id', $id)
        ->get();
        // return $data;
        return UserResource::collection($data);
    }
    

}
