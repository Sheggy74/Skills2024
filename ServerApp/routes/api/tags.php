<?php

use App\Http\Controllers\TagsController;
use Illuminate\Support\Facades\Route;

Route::prefix('tags')
    ->middleware('auth:api', 'auth.user')
    ->controller(TagsController::class)
    ->group(function (){
        Route::get('','index');
        Route::get('{id}','show');
        Route::post('','create');
        Route::put('{id}','update');
        Route::delete('{id}','delete');
    });
