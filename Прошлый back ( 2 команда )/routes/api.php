<?php

use App\Models\Task;
use App\Models\TaskRequest;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RolesController;
use App\Http\Controllers\TasksController;
use App\Http\Controllers\UsersController;
//use App\Http\Controllers\AuditsController;
use App\Http\Controllers\ReportsController;

use App\Http\Controllers\DepartmentsController;
use App\Http\Controllers\PermissionsController;
use App\Http\Controllers\TaskRequestsController;

use App\Http\Resources\TaskRequestResource;
use App\Http\Resources\TaskResource;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/tasks')->group(function () {
    //Route::get('/', [TasksController::class, 'index']);         // Вывод всех
    Route::get('/', function () {
        return TaskResource::collection(Task::all());   // Вывод всех
    });
    Route::get('/{id}', [TasksController::class, 'show']);      // Вывод 1 записи по id
    Route::post('/', [TasksController::class, 'store']);        // Сохранение 1 записи
    Route::put('/{id}', [TasksController::class, 'update']);        // Обновление 1 записи
    Route::delete('/{id}', [TasksController::class, 'destroy']);    // Удаление 1 записи
});

Route::prefix('/roles')->group(function () {
    Route::get('/', [RolesController::class, 'index']);         // Вывод всех
    Route::get('/{id}', [RolesController::class, 'show']);      // Вывод 1 записи по id
    Route::post('/', [RolesController::class, 'store']);        // Сохранение 1 записи
    Route::put('/{id}', [RolesController::class, 'update']);        // Обновление 1 записи
    Route::delete('/{id}', [RolesController::class, 'destroy']);    // Удаление 1 записи
    Route::get('/gettasks/{id}', [RolesController::class, 'getTasks']);       // Вывод текущих задач у роли
    Route::post('/settasks/{id}', [RolesController::class, 'setTasks']);      // Установка задач роли
});

Route::prefix('/requests')->group(function () {

    Route::get('/', function () {
        return TaskRequestResource::collection(TaskRequest::all());
    });
    Route::get('/{id}', [TaskRequestsController::class, 'show']);      // Вывод 1 записи по id
    Route::post('/', [TaskRequestsController::class, 'store']);        // Сохранение 1 записи
    Route::put('/{id}', [TaskRequestsController::class, 'update']);        // Обновление 1 записи
    Route::delete('/{id}', [TaskRequestsController::class, 'destroy']);    // Удаление 1 записи
});

Route::prefix('/users')->group(function () {

    Route::get('/', [UsersController::class, 'index']);
    Route::get('/{id}', [UsersController::class, 'show']);      // Вывод 1 записи по id
    Route::post('/', [UsersController::class, 'store']);        // Сохранение 1 записи
    Route::put('/{id}', [UsersController::class, 'update']);        // Обновление 1 записи
    Route::delete('/{id}', [UsersController::class, 'destroy']);    // Удаление 1 записи
    Route::get('/getroles/{id}', [UsersController::class, 'getRoles']);      // Вывод текущих ролей пользователяч
    Route::post('/setroles/{id}', [UsersController::class, 'setRoles']);      // Установка ролей пользователю
});


//Route::post('/tasks', [TasksController::class, 'store']); // Добавление

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/login', [UsersController::class, 'login']);
Route::get('/register', [UsersController::class, 'register']);
// ИР
//Route::get('/tasks', [TasksController::class, 'index']); // Вывод всех

/*Route::get('/tasks', function () {
    return TaskResource::collection(Task::all());   // Вывод всех
});


Route::put('/tasks', [TasksController::class, 'update']); // Изменение
Route::delete('/tasks', [TasksController::class, 'destroy']); // Удаление*/

//Route::get('/roles', [RolesController::class, 'index']);

//Route::get('/users', [UsersController::class, 'index']);
//Route::get('/users/{id}',[UsersController::class, 'getUser']);



Route::get('/permissions', [PermissionsController::class, 'index']);
//Route::get('/audit', [AuditsController::class, 'index']);
Route::get('/reports', [ReportsController::class, 'index']);
Route::get('/departments', [DepartmentsController::class, 'index']);

