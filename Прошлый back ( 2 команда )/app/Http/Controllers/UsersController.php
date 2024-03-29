<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Models\User;

class UsersController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json($users);
    }

    public function show($id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    public function store(UserRequest $request)
    {
        $user = User::create($request->all());
        return response()->json($user, 201);
    }

    public function update(UserRequest $request, $id)
    {
        $user = User::findOrFail($id);

        $user->update($request->all());
        return response()->json($user);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }

    public function getRoles($id) {
        $user = User::find($id);
        return response()->json($user->roles);
        //dd($user->roles);

    }

    public function setRoles(UserRequest $request,$id) {

        $roleIds = $request->roleIds;
        $user = User::find($id);

        if ($roleIds && $roleIds != '') {
            $rols = array_map('intval', explode(',', $roleIds));

            $user->roles()->attach($rols);
            return response()->json($user, 201);
        } else {
            $user->roles()->detach();
            return response()->json(null, 201);
        }

    }

}
