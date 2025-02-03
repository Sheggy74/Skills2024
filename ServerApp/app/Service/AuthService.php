<?php

namespace App\Service;

use App\Entity\NavigationButton;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;

class AuthService
{

    public static function getNavigationButtons(Collection $roles): Collection
    {
        $buttons = collect();
        if ($roles->filter(function ($role) {
            return $role->id == 1;
        })->first()) {

            $buttons->push(
                new NavigationButton([
                    'caption' => 'Пользователи',
                    'iconClass' => 'person',
                    'routerLink' => 'admin/users'
                ])
            );

            $buttons->push(
                new NavigationButton([
                    'caption' => 'Проекты',
                    'iconClass' => 'book',
                    'routerLink' => 'projects',
                ])
            );
        }
        
        $buttons->push(
            new NavigationButton([
                'caption' => 'Домашняя страница',
                'iconClass' => 'home',
                'routerLink' => 'home'
            ])
        );
        
        $projects=DB::table('rule_project')->where('user_id',Auth::user()->id)
            ->where('role_id',1)->get();

        if( count($projects)!=0){
            $buttons->push(
                new NavigationButton([
                    'caption' => 'Проекты',
                    'iconClass' => 'book',
                    'routerLink' => 'projects',
                ])
            );
        }
        // $buttons->push(
        //     new NavigationButton([
        //         'caption' => 'Исполнители',
        //         'iconClass' => 'people',
        //         'routerLink' => 'executors'
        //     ])
        // );
        //
        // $buttons->push(
        //     new NavigationButton([
        //         'caption' => 'Испытания',
        //         'iconClass' => 'fact_check',
        //         'routerLink' => 'experiments'
        //     ])
        // );
        //
        // $buttons->push(
        //     new NavigationButton([
        //         'caption' => 'Скрипты',
        //         'iconClass' => 'description',
        //         'routerLink' => 'scripts'
        //     ])
        // );
        //
        return $buttons;
    }


}
