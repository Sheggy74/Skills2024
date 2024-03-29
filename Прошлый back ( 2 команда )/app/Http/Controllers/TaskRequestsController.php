<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequestRequest;
use App\Http\Resources\TaskRequestResource;
use App\Http\Resources\TaskRequestCollection;
use App\Models\Task;
use App\Models\TaskRequest;

class TaskRequestsController extends Controller
{
    public function index()
    {
        $accessRequests = TaskRequest::all();
        //return response()->json($accessRequests);
        //return response()->json(['success' => true, 'tasks' => new TaskRequestCollection($accessRequests)]);
        return response()->json(['success' => true, 'data' => new TaskRequestResource($accessRequests)]);
    }

    public function show($id)
    {
        $task = TaskRequest::findOrFail($id);
        return response()->json($task);
    }

    public function store(TaskRequestRequest $request)
    {
        $task = TaskRequest::create($request->all());
        return response()->json($task, 201);
    }

    public function update(TaskRequestRequest $request, $id)
    {
        $task = TaskRequest::findOrFail($id);
        $task->update($request->all());
        return response()->json($task);
    }

    public function destroy($id)
    {
        $task = TaskRequest::findOrFail($id);
        $task->delete();
        return response()->json(null, 204);
    }
}
