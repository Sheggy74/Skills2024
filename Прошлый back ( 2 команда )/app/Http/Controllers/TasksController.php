<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;

class TasksController extends Controller
{
    public function index()
    {
        $tasks = Task::all();
        return response()->json($tasks);
    }

    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    public function store(TaskRequest $request)
    {

        $request->validate(
            [
                'name'       => 'required',
                'mnemocode' => 'required|unique:tasks',
                'description' => 'required',
            ]
        );

        $task = Task::create($request->all());
        return response()->json($task, 201);
    }

    public function update(TaskRequest $request, $id)
    {
        $task = Task::findOrFail($id);

        $request->validate(
            [
                'name'       => 'required',
                'mnemocode' => 'required|unique:tasks',
                'description' => 'required',
            ]
        );

        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy($id)
    {

        $task = Task::findOrFail($id);
        $task->delete();
        return response()->json(null, 204);
    }
}
