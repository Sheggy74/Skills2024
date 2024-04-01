<?php

use Illuminate\Support\Facades\Route;

Route::prefix('admin')
    ->middleware('auth:api','auth.admin')
    ->controller(\App\Http\Controllers\AdminController::class)
    ->group(function (){
        Route::get('users','index');
        Route::get('users/{id}','show');
        Route::post('users','create');
        Route::put('users/{id}','update');
        Route::delete('users/{id}','delete');
    });
