<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;

Route::prefix('projects')
    ->middleware('auth:api')
    ->controller(ProjectController::class)
    ->group(function (){
        Route::get('users','getUserRole');
        Route::get('','index');
        Route::get('{id}','show');
        Route::post('','create');
        Route::put('{id}','update');
        Route::delete('{id}','delete');
        
    });

