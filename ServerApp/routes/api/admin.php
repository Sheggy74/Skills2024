<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;

Route::post('admin/photo', [AdminController::class, 'uploadPhoto']);
Route::get('admin/getphoto', [AdminController::class, 'getPhoto']);


Route::prefix('admin')
    ->middleware('auth:api')
    ->middleware('auth.admin')
    ->controller(\App\Http\Controllers\AdminController::class)
    ->group(function () {
        Route::get('users', 'index');
        Route::get('users/{id}', 'show');
        Route::post('users', 'create');
        Route::put('users/{id}', 'update');
        Route::delete('users/{id}', 'delete');
        Route::post('uploadUsers','uploadUsers');
        Route::put('set-add','setAdd');
    });
