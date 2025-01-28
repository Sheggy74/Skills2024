<?php

use App\Http\Controllers\ExecutorsController;
use Illuminate\Support\Facades\Route;

Route::prefix('executors')
    ->middleware('auth:api', 'auth.user')
    ->controller(ExecutorsController::class)
    ->group(function () {
        Route::get('', 'get');
    });
