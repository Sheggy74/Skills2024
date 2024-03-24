<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\ToolResource;
use App\Models\Tool;
use Illuminate\Http\Request;

class ToolController extends Controller implements CrudController
{
    public function index(Request $request)
    {
        $data =  Tool::query()->get();
        return ToolResource::collection($data);
    }

    public function show($id, Request $request)
    {
        $data = Tool::query()->find($id);
        return new ToolResource($data);
    }

    public function create(Request $request)
    {
        $data = Tool::query()->create([
            'name' => $request->name
        ]);
        return new ToolResource($data);
    }

    public function update($id, Request $request)
    {
        Tool::query()->find($id)->update([
            'name' => $request->name,
            'number' => $request->nubmer,
            'date' => $request->date,
            'user_id' => $request->user_id,
            'tool_id' => $request->tool_Id
        ]);
        $data = Tool::query()->find($id);
        return new ToolResource($data);
    }

    public function delete($id)
    {
        Tool::query()->find($id)->delete();
        return 0;
    }
}
