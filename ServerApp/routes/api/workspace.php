<?php

use Illuminate\Support\Facades\Route;

Route::prefix('workspace')
    ->middleware('auth:api')
    ->controller(\App\Http\Controllers\WorkspaceController::class)
    ->group(function () {
        Route::get('{id}', 'showTasksForProject');
        Route::get('', 'showTasksForProject');
        // Route::get('users/{id}', 'show');
        // Route::post('users', 'create');
        // Route::put('users/{id}', 'update');
        // Route::delete('users/{id}', 'delete');
    });
