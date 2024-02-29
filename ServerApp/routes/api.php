<?php

use App\Http\Controllers\AuthController as AuthControllerAlias;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->post('log',\App\Http\Controllers\LogController::class);

Route::prefix('auth')
     ->middleware('api')
     ->controller(AuthControllerAlias::class)
     ->group(function (){
    Route::get('navigationButtons/{roleName}','getNavigationButtons');
    Route::post('login','login');
});


Route::prefix('admin')
    ->middleware('api')
    ->controller(\App\Http\Controllers\AdminController::class)
    ->group(function (){
        Route::get('users','index');
        Route::get('users/{id}','show');
        Route::post('users','create');
        Route::put('users/{id}','update');
        Route::delete('users/{id}','delete');

    });
