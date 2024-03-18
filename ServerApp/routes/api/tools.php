<?php


use App\Http\Controllers\ToolController;

Route::prefix('tools')
    ->middleware('api')
    ->controller(ToolController::class)
    ->group(function (){
        Route::get('','index');
        Route::get('{id}','show');
        Route::post('','create');
        Route::put('{id}','update');
        Route::delete('{id}','delete');
    });
