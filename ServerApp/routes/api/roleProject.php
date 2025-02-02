<?php

use App\Http\Controllers\RoleProjectController;
use Illuminate\Support\Facades\Route;

Route::prefix('roleprj')
    ->middleware('auth:api', 'auth.user')
    ->controller(RoleProjectController::class)
    ->group(function () {
        Route::get('', 'index');
    });
