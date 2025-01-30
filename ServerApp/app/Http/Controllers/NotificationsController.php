<?php

namespace App\Http\Controllers;
use App\Http\Controllers\Interface\CrudController;
use App\Models\Notifications;
use App\Http\Resources\NotificationsResource;
use Illuminate\Http\Request;

class NotificationsController extends Controller implements CrudController
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    
    public function index(Request $request)
    {
        $data =  Notifications::query()->orderBy('id','desc')->get();
        return NotificationsResource::collection($data);
    }

    public function show($id, Request $request)
    {
        $data = Notifications::where('user_id',$id)->where("is_read",false)
            ->orderBy('created_at')->get();
        return NotificationsResource::collection($data);
    }

    public function create(Request $request)
    {
        $data = Notifications::query()->create([
            'user_id'=>$request->user_id,
            'message'=>$request->message,
            'is_read'=>false
        ]);
        return new NotificationsResource($data);
    }

    public function update($id, Request $request)
    {
        Notifications::query()->find($id)->update([
            'user_id'=>$request->user_id,
            'message'=>$request->message,
            'is_read'=>$request->is_read=='true'?true:false
        ]);
        $data = Notifications::query()->find($id);
        return new NotificationsResource($data);
    }

    public function delete($id)
    {
        Notifications::query()->find($id)->delete();
        return 0;
    }
}
