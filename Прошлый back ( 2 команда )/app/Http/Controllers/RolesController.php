<?php

namespace App\Http\Controllers;

use App\Http\Requests\RoleRequest;
use App\Models\Role;
use App\Models\User;

class RolesController extends Controller
{
    public function index()
    {
        $roles = Role::all();
        return response()->json($roles);
    }

    public function show($id)
    {
        $role = Role::findOrFail($id);
        return response()->json($role);
    }

    public function store(RoleRequest $request)
    {
        $role = Role::create($request->all());
        return response()->json($role, 201);
    }

    public function update(RoleRequest $request, $id)
    {

        $role = Role::findOrFail($id);
        $input = $request->all();
        $role->fill($input)->save();

        //$role->update($request->all());
        return response()->json($role);
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();
        return response()->json(null, 204);
    }

    public function getUsers($id) {
        $role = Role::find($id);
        return response()->json($role->users);
        //dd($user->roles);

    }

    public function getTasks($id) {
        $role = Role::find($id);
        return response()->json($role->tasks);
        //dd($user->roles);

    }

    public function setTasks(RoleRequest $request,$id) {

        $taskIds = $request->taskIds;

        $role = Role::find($id);

        if ($taskIds && $taskIds != '') {
            $tasks = array_map('intval',explode(',',$taskIds));
            $role->tasks()->attach($tasks);
            return response()->json($role, 201);
        } else {
            $role->tasks()->detach();
            return response()->json(null, 201);
        }


    }

}
