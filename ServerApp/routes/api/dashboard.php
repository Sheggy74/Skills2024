<?php

use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::prefix('dashboard')->controller(DashboardController::class)->group(function () {

    Route::get('/myprojects', 'getMyProjects');
});
