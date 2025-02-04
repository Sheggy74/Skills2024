<?php

use Illuminate\Support\Facades\Route;

Route::prefix('workspace')
    ->middleware(['auth:api'])
    ->controller(\App\Http\Controllers\WorkspaceController::class)
    ->group(function () {
        Route::get('priority', 'showPriority');
        Route::get('state/{projectId}', 'showState');
        Route::get('{id}', 'showTasksForProject');
        Route::put('{id}', 'editTask');
        Route::post('', 'createTask');
        Route::delete('{id}', 'deleteTask');
        Route::get('projectuser/{id}', 'showProjectUser');
        Route::get('project/{id}', 'showProjectData');
        Route::get('projectuser/executorTask/{id}', 'showExecutorTask');
    });

Route::prefix('plan')
    ->middleware(['auth:api'])
    ->controller(\App\Http\Controllers\PlanController::class)
    ->group(function () {
        Route::get('{id}', 'showPriority');
        Route::get('users/{id}', 'showUsers');
        Route::get('topics', 'showTopics');
    });
