<?php

namespace App\Http\Controllers;

use App\Entity\NavigationButton;
use App\Models\User;
use App\Service\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only(['login','password']);
        if(! $token = auth('api')->attempt($credentials)){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $user = User::query()->where('login',$credentials['login'])->first();
        $roles = $user->roles()->get()->map(function($role){
            return [
                'id' => $role->id,
                'name' => $role->name,
                'startingUrl' => $role->starting_url
            ];
        });

        return [
            'accessToken' => $token,
            'refreshToken' => $token,
            'user' => [
                'id' => $user->id,
                'login' => $user->login,
                'firstName' => $user->name,
                'secondName' => '',
                'lastName' => '',
                'idPhoto' => ''
            ],
            'roles' => $roles,
            'accessDurationInSeconds' => 60000,
            'refreshDurationInHours' => 24,
            'accessEndDateTime' => null,
            'refreshEndDateTime' => null
        ];
    }

    public function getNavigationButtons($roleName, Request $request): array
    {
        $navigationButtons = AuthService::getNavigationButtons($roleName);
        return $navigationButtons->map(function(NavigationButton $item){
            return[
                'caption' => $item->getCaption(),
                'iconClass' => $item->getIconClass(),
                'routerLink' => $item->getRouterLink()
            ];
        })->all();
    }
}
