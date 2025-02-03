<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')
    ->middleware(['auth:api', 'auth.user'])
    ->controller(DashboardController::class)->group(function () {

        Route::get('/myprojects', 'getMyProjects');
        Route::get('/mytasks', 'getMyTasks');
        Route::get('/spenttime', 'getSpentTime');
        Route::get('/mynotifications', 'getMyNotifications');
        Route::get('/mychat', 'getMyChat');
    });
