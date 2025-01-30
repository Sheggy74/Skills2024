<?php

use App\Http\Controllers\TagsProjectController;
use Illuminate\Support\Facades\Route;

Route::prefix('tagspr')
    ->middleware('auth:api', 'auth.user')
    ->controller(TagsProjectController::class)
    ->group(function (){
        Route::get('','index');
        Route::get('{id}','show');
        Route::post('','create');
        Route::put('{id}','update');
        Route::delete('{id}/{tags_id}','delete');
    });
