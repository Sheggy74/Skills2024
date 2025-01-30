<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\NotificationsController;

Route::prefix('notifications')
    ->middleware(['auth:api'])
    ->controller(NotificationsController::class)
    ->group(function (){
        Route::get('','index');
        Route::get('{id}','show');
        Route::post('','create');
        Route::put('{id}','update');
        Route::delete('{id}','delete');
    });
