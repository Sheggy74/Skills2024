<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index(Request $request){
        return UserResource::collection(User::query()->orderBy('id','asc')->get());
    }

    public function show($id, Request $request)
    {
        return new UserResource(User::query()->find($id));
    }

    public function create(Request $request){
        $user = User::query()->create([
            'first_name' => $request->firstName,
            'second_name' => $request->secondName,
            'last_name' => $request->lastName,
            'photo' => $request->idPhoto,
            'email' => $request->email,
            'login' => $request->login,
            'password' => bcrypt($request->password)
        ]);
        return new UserResource($user);
    }

    public function update($id,Request $request){
        $user = User::query()->find($id);
        $result = $user->update([
            'first_name' => $request->firstName,
            'second_name' => $request->secondName,
            'last_name' => $request->lastName,
            'photo' => $request->idPhoto,
            'email' => $request->email,
            'login' => $request->login,
            'password' => $request->password ? bcrypt($request->password) : $user->password
        ]);
        if($result)
            return new UserResource( User::query()->find($id));
        return response()->json(['message' => 'Ошибка при обновлении пользователя'],500);
    }

    public function delete($id){
        try{
            User::query()->find($id)->delete();
        }
        catch (\Exception $e){
            return response()->json(['message' => 'Ошибка при удалении пользователя', 'error' => $e],500);
        }
        return response()->json(['message' => 'Успешно!'],200);
    }

}
