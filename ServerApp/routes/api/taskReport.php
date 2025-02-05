<?php

use App\Http\Controllers\TaskReportController;
use Illuminate\Support\Facades\Route;

Route::prefix('reportTask')
    ->controller(TaskReportController::class)
    ->group(function (){
        Route::get('','workTask');
        Route::post('','createReport');
        Route::get('{date}','reportCompleteTask');
        Route::get('boss/{id}/{date}','reportBoss');
        
    });

    Route::get('manager/{id}',[TaskReportController::class, 'isManager']);
    Route::get('btnDisable/{id}',[TaskReportController::class, 'isButtonCheck']);

