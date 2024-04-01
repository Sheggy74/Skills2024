<?php

use Illuminate\Support\Facades\Route;

Route::prefix('report')
    ->middleware('auth:api','auth.admin')
    ->controller(\App\Http\Controllers\ReportController::class)
    ->group(function (){
        Route::get('data','reportData');
        Route::get('report','data');
        Route::get('{id}','report');
    });
