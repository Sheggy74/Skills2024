<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;

Route::prefix('projects')
    ->middleware(['auth:api', 'auth.user'])
    ->controller(ProjectController::class)
    ->group(function (){
        Route::get('','index');
        Route::get('{id}','show');
        Route::post('','create');
        Route::put('{id}','update');
        Route::delete('{id}','delete');
        
    });

Route::prefix('project')
    ->middleware('auth:api', 'auth.user')
    ->controller(ProjectController::class)
    ->group(function () {
    Route::get('users', 'getUserRole');
    Route::get('users/{id}','getRuleProject');
    Route::get('user/{id}','getUserRolePrId');
    Route::get('task/{id}','getTasksProject');
});