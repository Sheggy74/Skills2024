<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Models\Task;
use App\Models\Project;
use App\Models\Priority;
use App\Http\Resources\TaskResource;
use App\Http\Resources\ProjectResource;
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
            'description'=>$request->description
        ]);
    }

    public function createTask(Request $request)
    {
        $date = Carbon::now()->format('Y-m-d');
        $data = Task::query()->create([
            'name' => $request->name,
            'description' => $request->description,
            'project_id' => 7,
            'user_id' => 1,
            'priority_id' => 1,
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
    

}
