<?php

namespace App\Http\Controllers;

use App\Entity\NavigationButton;
use App\Models\User;
use App\Service\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;
use App\Models\Task;
use App\Http\Resources\TaskResource;

class WorkspaceController extends Controller
{

    public function showTasksForProject(Request $request, $id) {
        $tasks = Task::where('project_id', '=', $id)->get();
        return TaskResource::collection($tasks);
    }

    public function editTask(Request $request, $id) {
        
    }
}
