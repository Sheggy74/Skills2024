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
                    'caption' => 'Администрирование',
                    'iconClass' => 'person',
                    'routerLink' => 'admin/users'
                ])
            );
            
        }        
        


        $buttons->push(
            new NavigationButton([
                'caption' => 'Планы',
                'iconClass' => 'book',
                'routerLink' => 'workspace'
            ])
        );
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
