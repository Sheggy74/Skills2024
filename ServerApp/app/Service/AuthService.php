<?php

namespace App\Service;

use App\Entity\NavigationButton;
use Illuminate\Support\Collection;


class AuthService{

    public static function getNavigationButtons($roleName) : Collection
    {

        if($roleName == 'admin'){
            $buttons = [
                new NavigationButton([
                    'caption' => 'Пользователи',
                    'iconClass' => 'person',
                    'routerLink' => 'admin/users'
                ])
            ];
            return collect($buttons);
        }

        return collect();

    }

}
