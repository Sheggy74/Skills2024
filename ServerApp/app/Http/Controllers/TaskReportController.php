<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskReportResource;
use App\Models\ReportWork;
use App\Models\StateTask;
use Carbon\Carbon;
use Carbon\Exceptions\EndLessPeriodException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Interface\CrudController;
use App\Http\Resources\FullCalendarRecource;
use App\Http\Resources\ProjectResource;
use App\Http\Resources\UserRoleResource;
use App\Models\Notifications;
use App\Models\Project;
use App\Models\RoleProject;
use App\Models\RuleProject;
use App\Models\Task;
use DateTime;
use Illuminate\Support\Facades\DB;

class TaskReportController extends Controller
{
    function workTask() {
        // dd(date('Y-m-d'));
        $task=Task::query()->
        select('task.id as id','task.name','report_work.id as report_id','report_work.date','report_work.percent','report_work.description')->
        leftJoin('report_work','report_work.task_id','task.id')->
        leftJoin('state_task','state_task.task_id','task.id')->
        orWhereIn('state_task.state_id',[1,2])->
        // ->whereDate('date','=',date('Y-m-d'))
        where('user_id',Auth::user()->id)->orderBy('priority_id','desc')->
        where('report_work.percent','<>',100)
        ->get();
        // $task=Task::query()->
        // where('user_id',Auth::user()->id)->orderBy('priority_id','desc')->get();
        return TaskReportResource::collection($task);

    }

    function createReport(Request $request){
        ReportWork::query()->create([
            'task_id' => $request->id,
            'date' => $request->date,
            'description' => $request->description,
            'percent' => $request->percent
        ]);
        if($request->percent==100||$request->percent+$request->oldPercent==100){
            StateTask::query()->create([
                'task_id'=>$request->id,
                'state_id'=>3
            ]);
        }
        return TaskReportController::workTask();
    }

    function reportCompleteTask() {
        $taskMonth=Task::query()->leftJoin('state_task','state_task.task_id','task.id')->
            where('state_task.state_id',3)->whereDate('date','=',date('Y-m-d'));
        return $taskMonth;

        // $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();

        // // Создаем лист и добавляем данные
        // $worksheet = $spreadsheet->getActiveSheet();
        // $worksheet->setTitle('Отчет Контроля выполнения');

        // foreach ($taskMonth as $task) {
        //     $worksheet->setCellValue('A' . $row, $task['id'])
        //             ->setCellValue('B' . $row, $task['name'])
        //             ->setCellValue('C' . $row, $task['description'])
        //             ->setCellValue('D' . $row, $task['date_create']);
        //     $row++;
        // }
    }

}
