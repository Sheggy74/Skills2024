<?php

use App\Http\Controllers\ScriptController;
use App\Http\Controllers\ApiLoadToTableController;
use Illuminate\Support\Facades\Route;

Route::prefix('scripts')
    ->middleware('auth:api','auth.user')
    ->controller(ScriptController::class)
    ->group(function (){
        Route::get('','index');
        Route::get('{id}','show');
        Route::post('','create');
        Route::put('{id}','update');
        Route::delete('{id}','delete');
    });

    Route::prefix('scripts_copy')
    ->middleware('api')
    ->controller(ApiLoadToTableController::class)
    ->group(function (){
        Route::get('','loadData');

    });

