<?php

namespace App\Service;

use App\Entity\NavigationButton;
use Illuminate\Support\Collection;


class AuthService{

    public static function getNavigationButtons($roleName) : Collection
    {
        $buttons = collect();
        if($roleName == 'admin'){
            $buttons->push(
                new NavigationButton([
                    'caption' => 'Пользователи',
                    'iconClass' => 'person',
                    'routerLink' => 'admin/users'
                ])
            );
            $buttons->push(
                new NavigationButton([
                    'caption' => 'Отчет',
                    'iconClass' => 'book',
                    'routerLink' => 'report'
                ])
            );
        }

        $buttons->push(
            new NavigationButton([
                'caption' => 'Испытания',
                'iconClass' => 'fact_check',
                'routerLink' => 'experiments'
            ])
        );


        $buttons->push(
            new NavigationButton([
                'caption' => 'Скрипты',
                'iconClass' => 'description',
                'routerLink' => 'scripts'
            ])
        );



        return $buttons;
    }

}
