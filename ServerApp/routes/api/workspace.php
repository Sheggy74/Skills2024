<?php

use Illuminate\Support\Facades\Route;

Route::prefix('workspace')
    ->middleware(['auth:api', 'auth.user'])
    ->controller(\App\Http\Controllers\WorkspaceController::class)
    ->group(function () {
        Route::get('priority', 'showPriority');
        Route::get('{id}', 'showTasksForProject');
        Route::put('{id}', 'editTask');
        Route::post('', 'createTask');
        Route::delete('{id}', 'deleteTask');
        Route::get('executors/{id}', 'show');
        Route::get('project/{id}', 'showProjectData');
    });
