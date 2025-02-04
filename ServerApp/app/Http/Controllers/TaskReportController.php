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
use App\Models\ReportTask;
use App\Models\RoleProject;
use App\Models\RuleProject;
use App\Models\Task;
use DateTime;
use Illuminate\Support\Facades\DB;

class TaskReportController extends Controller
{
    function workTask() {
        // dd(date('Y-m-d'));
        // $task=Task::query()->
        // select('task.id as id','task.name','report_work.id as report_id','report_work.date','report_work.percent','report_work.description')->
        // leftJoin('report_work','report_work.task_id','task.id')->
        // leftJoin('state_task','state_task.task_id','task.id')->
        // orWhereIn('state_task.state_id',[1,2])->
        // // ->whereDate('date','=',date('Y-m-d'))
        // where('user_id',Auth::user()->id)->orderBy('priority_id','desc')->
        // where('report_work.percent','<>',100)
        // ->get();

        // $task=DB::select(
        // 'select t.id as task_id, t.name from state_task st
        // left join (select task.id, task.name from task where task.user_id ='. Auth::user()->id .' group by task.id ,task.name) as t on t.id=st.task_id
        // where st.state_id<>3 '
        //     );

        $task=DB::select('SELECT t.id as task_id, t.name
        FROM state_task st
        LEFT JOIN (
            SELECT task.id, task.name
            FROM task
            WHERE task.user_id = '. Auth::user()->id .' 
            GROUP BY task.id, task.name
        ) AS t ON t.id = st.task_id
        WHERE st.state_id <> 3
        AND NOT EXISTS (
            SELECT 1
            FROM state_task st2
            WHERE st2.task_id = st.task_id
            AND st2.state_id = 3
        )
        GROUP BY t.id, t.name');
            
            
        // $task=Task::query()->
        // where('user_id',Auth::user()->id)->orderBy('priority_id','desc')->get();
        return TaskReportResource::collection($task);

    }

    function createReport(Request $request){
        // dump((int)$request->percent==100);
        // dump((int)$request->percent+(int)$request->oldPercent==100);
        // dd((int)$request->oldPercent==100);
        ReportTask::query()->create([
            'task_id' => $request->task_id,
            'date' => $request->date,
            'description' => $request->description,
            'percent' => $request->percent
        ]);
        if((int)$request->percent==100||(int)$request->percent+(int)$request->oldPercent==100||(int)$request->oldPercent==100){
            
            StateTask::query()->create([
                'task_id'=>$request->task_id,
                'state_id'=>3
            ]);
        }
      
        return TaskReportResource::collection(array());
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
