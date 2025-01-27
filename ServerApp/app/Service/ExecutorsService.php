<?php

namespace App\Service;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ExecutorsService
{
    public function getExecutors(Request $request)
    {
        $data = User::query()->select(DB::raw('x.*'))->from(DB::raw('users x'))->join(DB::raw('user_roles ur'), 'ur.user_id', 'x.id')->join(DB::raw('roles r'), 'ur.role_id', 'r.id')->whereRaw("r.name = 'executor'")->get();
        return UserResource::collection($data);
    }
}
