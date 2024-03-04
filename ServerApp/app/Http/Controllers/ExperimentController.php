<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\ExperimentResource;
use App\Models\Experiment;
use Illuminate\Http\Request;

class ExperimentController extends Controller implements CrudController
{

    public function index(Request $request)
    {
        $data =  Experiment::query()->get();
        return ExperimentResource::collection($data);
    }

    public function show($id, Request $request)
    {
        // TODO: Implement show() method.
    }

    public function create(Request $request)
    {
        // TODO: Implement create() method.
    }

    public function update($id, Request $request)
    {
        // TODO: Implement update() method.
    }

    public function delete($id)
    {
        // TODO: Implement delete() method.
    }
}
