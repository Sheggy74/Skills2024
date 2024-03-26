<?php

use App\Http\Controllers\AuthController as AuthControllerAlias;
use App\Http\Controllers\MessageController as MessageControllerAlias;
use App\Http\Controllers\ReportController as ReportControllerAlias;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('api')->post('log',\App\Http\Controllers\LogController::class);

Route::prefix('auth')
     ->middleware('api')
     ->controller(AuthControllerAlias::class)
     ->group(function (){
    Route::get('navigationButtons/{roleName}','getNavigationButtons');
    Route::post('login','login');
});

require_once __DIR__."/api/admin.php";
require_once __DIR__."/api/experiments.php";
require_once __DIR__."/api/tools.php";
require_once __DIR__."/api/scripts.php";

//params: mail , message
Route::prefix('message')
     ->middleware('api')
     ->controller(MessageControllerAlias::class)
     ->group(function (){
    Route::post('post','index');
});

Route::prefix('auth')
      ->middleware('api')
     ->controller(ReportControllerAlias::class)
     ->group(function (){
    Route::get('report','report');
    Route::get('data','reportData');
});

