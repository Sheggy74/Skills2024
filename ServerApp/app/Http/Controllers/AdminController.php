<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\UserResource;
use App\Models\Photo;
use App\Models\User;
use App\Models\UserRole;
use App\Service\AdminService;
use Illuminate\Http\Request;

class AdminController extends Controller implements CrudController
{
    public function index(Request $request)
    {
        return UserResource::collection(User::query()->whereNot('id',1)->orderBy('id', 'asc')->get());
    }

    public function show($id, Request $request)
    {
        return new UserResource(User::query()->find($id));
    }

    public function create(Request $request)
    {
        $user = User::query()->create([
            'first_name' => $request->first_name,
            'second_name' => $request->second_name,
            'last_name' => $request->last_name,
            'photo_url' => $request->photo_url,
            'email' => $request->email,
            'login' => $request->login,
            'password' => bcrypt($request->password)
        ]);
        return new UserResource($user);
    }

    public function update($id, Request $request)
    {

        $user = User::query()->find($id);

        $result = $user->update([
            'first_name' => $request->first_name,
            'second_name' => $request->second_name,
            'last_name' => $request->last_name,
            'photo_url' => $request->photo_url,
            'email' => $request->email,
            'login' => $request->login,
            'password' => $request->password ? bcrypt($request->password) : $user->password,
            'place' => $request->place,
            'job' => $request->job,
            'phone' => $request->phone
        ]);
        if ($result) {
            if ($request->role)
                UserRole::updateOrCreate([
                    'user_id' => $id,
                    'role_id' => $request->role['id']
                ]);
            return new UserResource(User::query()->find($id));
        }
        return response()->json(['message' => 'Ошибка при обновлении пользователя'], 500);
    }

    public function delete($id)
    {
        try {
            User::query()->find($id)->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => 'Ошибка при удалении пользователя', 'error' => $e], 500);
        }
        return response()->json(['message' => 'Успешно!'], 200);
    }

    public function uploadPhoto(Request $request)
    {
        // $request->validate([
        //     'file' => 'required|file|max:10240' // Максимум 10MB
        // ]);

        // $uploadedPhoto = $request->file('file');
        $path = $request->file('file')->store('photos', 'public');

        return response()->json(['message' => 'Фото загружено!', 'url' => $path]);
        // $data = file_get_contents($uploadedPhoto->getRealPath());

        // file_put_contents('file.webp', $data);

        // $photo = Photo::create([
        //     'name' => $uploadedPhoto->getClientOriginalName(),
        //     'data' => base64_encode(file_get_contents($uploadedPhoto->getRealPath())),
        //     'type' => $uploadedPhoto->getMimeType(),
        //     'size' => $uploadedPhoto->getSize()
        // ]);
        //
        // return response()->json(['message' => 'Фото успешно загружено!', 'photo_id' => $photo->id]);
    }

    public function getPhoto(Request $request)
    {
        $file = Photo::find($request->id);

        return base64_decode(stream_get_contents($file->data));
    }

    public function uploadUsers(Request $request){
        $service = new AdminService();
        $path = $request->file('file')->store('', 'public');
        $path = "storage/" . $path;
        $service->saveUsers($path);
    }

    public function setAdd(Request $request){
        $service = new AdminService();
        $service->setCanAdd($request->user_id, $request->can_add);
    }
}
