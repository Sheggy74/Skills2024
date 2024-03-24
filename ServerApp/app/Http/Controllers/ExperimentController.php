<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\ExperimentResource;
use App\Models\Experiment;
use App\Models\User;
use Illuminate\Http\Request;

class ExperimentController extends Controller implements CrudController
{

    public function index(Request $request)
    {
        $data =  Experiment::query()->orderBy('id','desc')->get();
        return ExperimentResource::collection($data);
    }

    public function show($id, Request $request)
    {
        $data = Experiment::query()->find($id);
        return new ExperimentResource($data);
    }

    public function create(Request $request)
    {
        $data = Experiment::query()->create([
            'name' => $request->name,
            'number' => $request->number,
            'date' => $request->date,
            'user_id' => $request->user_id,
            'tool_id' => $request->tool_id
        ]);
        return new ExperimentResource($data);
    }

    public function update($id, Request $request)
    {
        Experiment::query()->find($id)->update([
            'name' => $request->name,
            'number' => $request->number,
            'date' => $request->date,
            'user_id' => $request->user_id,
            'tool_id' => $request->tool_id
        ]);
        $data = Experiment::query()->find($id);
        return new ExperimentResource($data);
    }

    public function delete($id)
    {
        Experiment::query()->find($id)->delete();
        return 0;
    }
}
