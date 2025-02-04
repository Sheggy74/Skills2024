<?php

namespace App\Http\Controllers;

use App\Models\Deadline;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Models\Task;
use App\Models\Project;
use App\Models\Priority;
use App\Models\User;
use App\Models\State;
use App\Http\Resources\TaskResource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserRoleResource;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class PlanController extends Controller
{

    public function showTasksForProject(Request $request, $id)
    {
        $tasks = Task::with(['priority', 'user', 'deadline'])->where('user_id', '=', $id)->get();
        // return $tasks;
        return TaskResource::collection($tasks);
    }


    public function showUsers(Request $request, $id)
    {
        // $tasks = Task::with(['priority', 'user', 'deadline'])->where('user_id', '=', $id)->get();
        $users = User::orWhere([['id', $id], ['boss_id', $id]])->get();
        // return $tasks;
        return $users;
        // return TaskResource::collection($tasks);
    }

    

}
