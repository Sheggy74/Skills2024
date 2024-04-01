<?php

use App\Http\Controllers\ExperimentController;
use Illuminate\Support\Facades\Route;

Route::prefix('experiments')
    ->middleware('auth:api')
    ->controller(ExperimentController::class)
    ->group(function (){
        Route::get('','index');
        Route::get('{id}','show');
        Route::post('','create');
        Route::put('{id}','update');
        Route::delete('{id}','delete');
    });
