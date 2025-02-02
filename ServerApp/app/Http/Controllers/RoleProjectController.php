<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\RoleProjectResource;
use App\Models\RoleProject;
use Illuminate\Http\Request;

class RoleProjectController extends Controller implements CrudController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function index(Request $request)
    {
        $data =  RoleProject::query()->orderBy('id','desc')->get();
        return RoleProjectResource::collection($data);
    }

    public function show($id, Request $request)
    {
        $data = RoleProject::query()->find($id);
        return new RoleProjectResource($data);
    }

    public function create(Request $request)
    {
        $data = RoleProject::query()->create([
            'name' => $request->name
        ]);
        return new RoleProjectResource($data);
    }

    public function update($id, Request $request)
    {
        RoleProject::query()->find($id)->update([
            'name' => $request->name 
        ]);
        $data = RoleProject::query()->find($id);
        return new RoleProjectResource($data);
    }

    public function delete($id)
    {
        RoleProject::query()->find($id)->delete();
        return 0;
    }
}
