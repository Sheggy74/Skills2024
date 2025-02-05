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
    // ->middleware(['auth:api'])
    ->controller(\App\Http\Controllers\PlanController::class)
    ->group(function () {
        Route::get('manager', 'showManagerId');
        Route::get('workload/{id}', 'showWorkloadUser');
        Route::get('allperformers/{id}', 'showAllSubardinates');
        Route::get('topics/{id}', 'showTopicsUser');
        Route::get('users/{id}', 'showUsers');
        Route::get('topics', 'showTopics');
         Route::get('tasks', 'getPlans');
        Route::get('{id}', 'showTasksForUser');
        Route::post('/order','SaveOrder');
    });
