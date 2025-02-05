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
// use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
// use PhpOffice\PhpSpreadsheet\Spreadsheet;
// use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Shared\Date;

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

    function reportCompleteTask($date) {
        // $taskMonth=Task::query()->leftJoin('state_task','state_task.task_id','task.id')->
        //     where('state_task.state_id',3)->whereDate('date','=',date('Y-m-d'));
        // return $taskMonth;
        $taskMonth=DB::select("WITH RECURSIVE topic_hierarchy AS (
            -- Начинаем с корневых топиков (те, у которых нет родителя)
            SELECT id, upper_level, name, CAST(name AS text) AS full_topic_name
            FROM topics
            WHERE upper_level IS NULL
            
            UNION ALL
            
            -- Рекурсивное соединение для дочерних топиков
            SELECT t.id, t.upper_level , t.name, CONCAT(th.full_topic_name, '/', t.name) AS full_topic_name
            FROM topics t
            INNER JOIN topic_hierarchy th ON t.upper_level = th.id
                )
                SELECT 
                    t.id,
                    t.name,
                    u.last_name, 
                    u.first_name, 
                    u.second_name, 
                    st.created_at, 
                    t.topic_id,
                    th.full_topic_name
                FROM task t
                LEFT JOIN users u ON u.id = t.user_id
                LEFT JOIN state_task st ON st.task_id = t.id
                LEFT JOIN topic_hierarchy th ON th.id = t.topic_id
                WHERE st.state_id = 3 and st.created_at::date between date_trunc('month',st.created_at) and to_date('".$date."','yyyy-mm-dd')");
                // return $taskMonth;
                $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Установим название отчета
        $sheet->mergeCells('A1:D1');
        $sheet->setCellValue('A1', 'Отчет контроля выполнения');
        
        // Применим стиль для названия отчета
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        // Установим заголовки столбцов
        $sheet->setCellValue('A2', 'Задача')
              ->setCellValue('B2', 'Исполнитель')
              ->setCellValue('C2', 'Дата выполнения')
              ->setCellValue('D2', 'Тематика');

        // Применим стиль для шапки (жирный шрифт, выравнивание по центру)
        $sheet->getStyle('A2:D2')->getFont()->setBold(true);
        $sheet->getStyle('A2:D2')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);
        
        // Применим границы для всех ячеек
        $sheet->getStyle('A2:D' . (count($taskMonth) + 2))->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);
        
        // Заполнение данных
        $row = 3;
        foreach ($taskMonth as $item) {
            $sheet->setCellValue('A' . $row, $item->name);
            $sheet->setCellValue('B' . $row, $item->last_name . ' ' . $item->first_name . ' ' . $item->second_name); // Исполнитель
            $sheet->setCellValue('C' . $row, Date::PHPToExcel(new \DateTime($item->created_at)));
            $sheet->setCellValue('D' . $row, $item->full_topic_name); // Topic
            $row++;
        }

        // Форматируем дату в нужный формат
        $sheet->getStyle('C3:C' . $row)->getNumberFormat()->setFormatCode('YYYY-MM-DD HH:MM:SS');

        // Применим отступы для всех ячеек
        $sheet->getStyle('A2:D' . $row)->getAlignment()->setIndent(1);

        // Устанавливаем ширину столбцов
        $sheet->getColumnDimension('A')->setWidth(20); // Ширина для Task Name
        $sheet->getColumnDimension('B')->setWidth(30); // Ширина для Исполнитель (ФИО)
        $sheet->getColumnDimension('C')->setWidth(25); // Ширина для Created At (дата)
        $sheet->getColumnDimension('D')->setWidth(80); // Ширина для Topic (так как Topic может быть длинным)

        // Записываем файл
        $writer = new Xlsx($spreadsheet);

        // Отправляем файл на загрузку
        $fileName = 'task_report.xlsx';
        return response()->stream(
            function() use ($writer) {
                $writer->save('php://output');
            },
            200,
            [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition' => 'attachment; filename="task_report.xlsx"',
            ]
        );
    }

    function reportBoss($id,$date) {
        $tasks=DB::select('select t.name,rt.description ,rt."date" ,rt."percent" ,rt.description ,concat(u.last_name,\' \',substr(u.second_name,1,1),\'.\' ,substr(u.first_name,1,1)) as fio from report_task rt 
            left join task t on t.id=rt.task_id
            left join state_task st on st.task_id=t.id
            left join (
                with recursive cte as(
                select users.* from users where users.boss_id='.$id.' 
                union all
                select users.* from users,cte where users.boss_id =cte.id
                )select * from cte
            ) u on u.id=t.user_id 
            where st.state_id=3 and date=to_date(\''.$date.'\',\'yyyy-mm-dd\')');
            // return $tasks;

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Установим название отчета
        $sheet->mergeCells('A1:E1');
        $sheet->setCellValue('A1', 'Отчет промежуточного контроля '. $date);

        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        // Установим заголовки столбцов
        $sheet->setCellValue('A2', 'Задача')
              ->setCellValue('B2', 'Исполнитель')
              ->setCellValue('C2', 'Дата выполнения')
              ->setCellValue('D2', 'Описание задачи')
              ->setCellValue('E2', 'Степень выполнения');

        $sheet->getStyle('A2:E2')->getFont()->setBold(true);
        $sheet->getStyle('A2:E2')->getAlignment()->setHorizontal(\PhpOffice\PhpSpreadsheet\Style\Alignment::HORIZONTAL_CENTER);

        $sheet->getStyle('A2:E' . (count($tasks) + 2))->getBorders()->getAllBorders()->setBorderStyle(\PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN);

        $row = 3;
        foreach ($tasks as $item) {
            $sheet->setCellValue('A' . $row, $item->name); // имя задачи
            $sheet->setCellValue('B' . $row, $item->fio); // Исполнитель
            $sheet->setCellValue('C' . $row, Date::PHPToExcel(new \DateTime($item->date)));
            $sheet->setCellValue('D' . $row, $item->description); // опсианние задачи
            $sheet->setCellValue('E' . $row, $item->percent); // %
            $row++;
        }
        
         // Форматируем дату в нужный формат
         $sheet->getStyle('C3:C' . $row)->getNumberFormat()->setFormatCode('YYYY-MM-DD');

         // Применим отступы для всех ячеек
         $sheet->getStyle('A2:E' . $row)->getAlignment()->setIndent(1);

         // Устанавливаем ширину столбцов
        $sheet->getColumnDimension('A')->setWidth(20); 
        $sheet->getColumnDimension('B')->setWidth(30); 
        $sheet->getColumnDimension('C')->setWidth(25); 
        $sheet->getColumnDimension('D')->setWidth(40); 
        $sheet->getColumnDimension('E')->setWidth(20); 

        $writer = new Xlsx($spreadsheet);

        // Отправляем файл на загрузку
        $fileName = 'report-'.$date.'.xlsx';
        return response()->stream(
            function() use ($writer) {
                $writer->save('php://output');
            },
            200,
            [
                'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition' => 'attachment; filename="task_report.xlsx"',
            ]
        );
    }

    function isManager($id)  {
        $workersBoss=DB::select('with recursive cte as(
            select users.* from users where users.boss_id='.$id.' 
            union all
            select users.* from users,cte where users.boss_id =cte.id
            )select * from cte');
        if(count($workersBoss)==0){
            return 0;
        }else{
            return 1;
        }
    }
}
