<?php

use App\Http\Controllers\ScriptController;
use Illuminate\Support\Facades\Route;

Route::prefix('scripts')
    ->middleware('api')
    ->controller(ScriptController::class)
    ->group(function (){
        Route::get('','index');
        Route::get('{id}','show');
        Route::post('','create');
        Route::put('{id}','update');
        Route::delete('{id}','delete');
    });
