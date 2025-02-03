<?php

namespace App\Http\Controllers;
//require 'vendor/autoload.php';
use Illuminate\Http\Request;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Chart\Chart;
use PhpOffice\PhpSpreadsheet\Chart\Legend;
use PhpOffice\PhpSpreadsheet\Chart\PlotArea;
use PhpOffice\PhpSpreadsheet\Chart\DataSeries;
use PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues;
use PhpOffice\PhpSpreadsheet\Chart\Axis;
use PhpOffice\PhpSpreadsheet\Chart\GridLines;
use PhpOffice\PhpSpreadsheet\Chart\Title;
use PhpOffice\PhpSpreadsheet\Style\Border;
use Maatwebsite\Excel\Concerns\WithCharts;
use App\Http\Resources\ReportResource;
use App\Http\Resources\ExperimentResource;
use App\Http\Resources\UserResource;
use App\Models\Report;
use App\Models\ReportValues;
use App\Models\Experiment;
use App\Models\Project;
use App\Models\Task;
use App\Models\User;
use Illuminate\Container\Attributes\Tag;

class ReportController extends Controller 
{
   
    public function report(Request $request,$id) {

        $data = Report::where('experiments_id',$id)->get();
        $values=ReportValues::where('experiments_id',$id)->get();
        $experiments=new ExperimentResource(Experiment::query()->find($id));
        $user=new UserResource(User::query()->find($experiments->user_id));
        $fio=$user->second_name.' '.substr($user->first_name,0,1).'.'.substr($user->last_name,0,1).'.'; 
        $array_data=[];
        $array_values=[];

        foreach($data as $item){
            $row=[];
            array_push($row,$item->series);
            array_push($row,$item->x);
            array_push($row,$item->y);
            array_push($array_data,$row);
        }

        foreach($values as $item){
            $row=[];
            array_push($row,$item->name);
            array_push($row,$item->description);
            array_push($row,$item->value);
            array_push($row,$item->conclusion);
            array_push($array_values,$row);
        }

        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $worksheet = $spreadsheet->getActiveSheet();

        $worksheet->setTitle('Отчет');

        $worksheet->setCellValue('A1','Испытание:')->getStyle('A1')->getFont()->setBold(true);
        $worksheet->setCellValue('A2','Инициатор:')->getStyle('A2')->getFont()->setBold(true);
        $worksheet->setCellValue('A3','Оборудование:')->getStyle('A3')->getFont()->setBold(true);
        $worksheet->setCellValue('D1','Дата:')->getStyle('D1')->getFont()->setBold(true);
        $worksheet->setCellValue('F1','Время:')->getStyle('F1')->getFont()->setBold(true);
        $worksheet->setCellValue('D2','№ проведения')->getStyle('D2')->getFont()->setBold(true);
        $worksheet->setCellValue('M1','Расчетные величины')->getStyle('M1')->getFont()->setBold(true);
        $worksheet->setCellValue('M3','Наименование')->getStyle('M3')->getFont()->setBold(true);
        $worksheet->setCellValue('N3','Обозначение')->getStyle('N3')->getFont()->setBold(true);
        $worksheet->setCellValue('O3','Значение')->getStyle('O3')->getFont()->setBold(true);
        $worksheet->setCellValue('P3','Вывод')->getStyle('P3')->getFont()->setBold(true);
        $worksheet->setCellValue('A5','№')->getStyle('A5')->getFont()->setBold(true);
        $worksheet->setCellValue('B5','x')->getStyle('B5')->getFont()->setBold(true);
        $worksheet->setCellValue('C5','y')->getStyle('C5')->getFont()->setBold(true);
        $worksheet->setCellValue('A'.count($array_data)+5+1,'SUM:');

        $worksheet->getStyle('A5:C'.count($array_data)+5)->getBorders()->applyFromArray(
            [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_MEDIUM,
                    'color' => [
                        'rgb' => '808080'
                    ]
                ]
            ]
        );

        $worksheet->getStyle('M3:P'.count($array_values)+3)->getBorders()->applyFromArray(
            [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_MEDIUM,
                    'color' => [
                        'rgb' => '808080'
                    ]
                ]
            ]
        );

        $worksheet->getColumnDimension('A')->setWidth(100,'px');
        $worksheet->getColumnDimension('D')->setWidth(100,'px');
        $worksheet->getColumnDimension('M')->setWidth(100,'px');
        $worksheet->getColumnDimension('N')->setWidth(100,'px');
        $worksheet->getColumnDimension('O')->setWidth(100,'px');
        $worksheet->getColumnDimension('P')->setWidth(150,'px');
        $worksheet->getColumnDimension('M')->setWidth(150,'px');
        $worksheet->getColumnDimension('B')->setWidth(150,'px');
        $worksheet->getColumnDimension('E')->setWidth(150,'px');

        $worksheet->mergeCells('M1:N1');

        $worksheet->fromArray($array_data,NULL,'A6');
        $worksheet->fromArray($array_values,NULL,'M4');
        $worksheet->setCellValue('B1',$experiments->name);
        $worksheet->setCellValue('E1',$experiments->date);
        $worksheet->setCellValue('B2',$fio);
        // $worksheet->setCellValue('B3',$experiments->tool['name']);
        $worksheet->setCellValue('E2',$experiments->number);

        $formulaSumX='=SUM(B6:B'.count($array_data)+5+1;
        $formulaSumX.=')';
        $formulaSumY='=SUM(C6:C'.count($array_data)+5+1;
        $formulaSumY.=')';
        $worksheet->setCellValue('B'.count($array_data)+5+1,$formulaSumX);
        $worksheet->setCellValue('C'.count($array_data)+5+1,$formulaSumY);
        
        $dataSeriesLabels=[new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('String','B5:C5',NULL)];
        $xAxisTickValues=[new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('Number','B6:B'.count($array_values)+6,NULL)];
        $dataSeriesValues=[new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('Number','B6:B'.count($array_values)+6,NULL),
                            new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('Number','C6:C'.count($array_values)+6,NULL)];
        $series =new \PhpOffice\PhpSpreadsheet\Chart\DataSeries(
            \PhpOffice\PhpSpreadsheet\Chart\DataSeries::TYPE_BARCHART, 
            null, 
            range(0, count($dataSeriesValues)-1), 
            $dataSeriesLabels, 
            $xAxisTickValues, 
            $dataSeriesValues,
            );
        $layout = new \PhpOffice\PhpSpreadsheet\Chart\Layout();
        $layout->setShowVal(true);
        $layout->setShowPercent(true);
        $plotArea = new \PhpOffice\PhpSpreadsheet\Chart\PlotArea($layout, [$series]);
        $legend = new \PhpOffice\PhpSpreadsheet\Chart\Legend(\PhpOffice\PhpSpreadsheet\Chart\Legend::POSITION_RIGHT, null, false);
        $title = new \PhpOffice\PhpSpreadsheet\Chart\Title('Chart 1');
        $chart = new Chart(
            'chart', 
            $title, 
            $legend, 
            $plotArea, 
            true, 
            'gap',
            null, 
            null   
            );
        $chart->setTopLeftPosition('A12');
        $chart->setBottomRightPosition('H20');
        $worksheet->addChart($chart);

        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="report.xlsx"');
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->setIncludeCharts(true);
        $writer->save('php://output');
    }

    public function reportData() {

        return [
            [
                'id'=>1,
                'name'=>'M334-2',
                'value'=>2.23,
                'temperature'=>70,
                'date'=>'2023-05-12',
            ],
            [
                'id'=>2,
                'name'=>'M334-3',
                'value'=>5,
                'temperature'=>90,
                'date'=>'2023-12-12',
            ],
            [
                'id'=>3,
                'name'=>'M34-2',
                'value'=>25,
                'temperature'=>180,
                'date'=>'2023-03-02',
            ]
        ];
    }

    public function data()
    {
        // $data = Experiment::query()->orderBy('id','desc')->get();
        // return ReportResource::collection($data);
        return [
            'data'=>[
                array(
                    "id"=> 10,
                    "name"=> "Quae hic assumenda sequi.",
                    "number"=> "123ZY-244657",
                    "date"=> "2002-12-24",
                    "user"=> array(
                        "second_name"=> "Maribel",
                        "last_name"=> "Marvin",
                        "first_name"=> "Thalia"
                    ),
                    "tool"=> "amet",
                    "report"=> [],
                    "values"=> []
                ),
                array(
                    "id"=> 1,
                    "name"=> "Accusantium rerum animi.",
                    "number"=> "123ZY-244657",
                    "date"=> "2001-05-05",
                    "user"=> array(
                        "second_name"=> "Wilhelmine",
                        "last_name"=> "Ratke",
                        "first_name"=> "Pamela"
                    ),
                    "tool"=> "laboriosam",
                    "report"=> [
                        array(
                            "id"=> 1,
                            "series"=> 1,
                            "x"=> "0.116",
                            "y"=> "0.081",
                            "experiments_id"=> 1
                        ),
                        array(
                            "id"=> 2,
                            "series"=> 2,
                            "x"=> "0.095",
                            "y"=> "0.117",
                            "experiments_id"=> 1
                        ),
                        array(
                            "id"=> 3,
                            "series"=> 3,
                            "x"=> "0.088",
                            "y"=> "0.094",
                            "experiments_id"=> 1
                        ),
                        array(
                            "id"=> 4,
                            "series"=> 4,
                            "x"=> "0.109",
                            "y"=> "0.112",
                            "experiments_id"=> 1
                        ),
                        array(
                            "id"=> 5,
                            "series"=> 5,
                            "x"=> "0.117",
                            "y"=> "0.108",
                            "experiments_id"=> 1
                        )
                    ],
                    "values"=> [
                        array(
                            "id"=> 1,
                            "name"=> "Максимальная дисперсия параллельных опредлений",
                            "description"=> "S 2x max",
                            "value"=> "0.0006125",
                            "conclusion"=> null,
                            "experiments_id"=> 1
                        ),
                        array(
                            "id"=> 2,
                            "name"=> "Сумма дисперсий параллельных определений",
                            "description"=> "Сумма S 2x",
                            "value"=> "0.0017025",
                            "conclusion"=> null,
                            "experiments_id"=> 1
                        ),
                        array(
                            "id"=> 3,
                            "name"=> "Значение критерия Кохрена",
                            "description"=> "G",
                            "value"=> "0.359",
                            "conclusion"=> "дисперсия однородна",
                            "experiments_id"=> 1
                        )
                    ]
                ),
            ],
        ];
    }

    function ReportProject($id) {
        $project=Project::query()->where('id',$id)->get();
        $allTasks=Task::query()->where('project_id',$id)->get();
        $completeTasks=Task::query()->where('project_id',$id)->
            leftJoin('state_task','state_task.task_id','task.id')->
            where('state_task.state_id',3)->get();
        //просроченные задания
        // $expiredTasks=Task::query()->where('project_id',$id)->
        //     leftJoin('deadline','deadline.task_id','task.id')->where('deadline.date'<now())->get();
        // return $completeTasks;

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        $sheet->setCellValue('A1', 'Проект');
        $sheet->setCellValue('A2', 'ID');
        $sheet->setCellValue('B2', $project['id']);
        $sheet->setCellValue('A3', 'Название');
        $sheet->setCellValue('B3', $project['name']);
        $sheet->setCellValue('A4', 'Описание');
        $sheet->setCellValue('B4', $project['description']);
        $sheet->setCellValue('A5', 'Иконка');
        $sheet->setCellValue('B5', $project['icon']);
        $sheet->setCellValue('A6', 'Тема');
        $sheet->setCellValue('B6', $project['theme']);
        $sheet->setCellValue('A7', 'Дата создания');
        $sheet->setCellValue('B7', $project['created_at']);
        $sheet->setCellValue('A8', 'Дата обновления');
        $sheet->setCellValue('B8', $project['updated_at']);
        
        // Заголовки для списка задач
        $sheet->setCellValue('A10', 'Задачи');
        $sheet->setCellValue('A11', 'ID');
        $sheet->setCellValue('B11', 'Название');
        $sheet->setCellValue('C11', 'Описание');
        $sheet->setCellValue('D11', 'Дата создания');
        
        // Заполнение задач
        $row = 12;
        foreach ($allTasks as $task) {
            $sheet->setCellValue('A' . $row, $task['id']);
            $sheet->setCellValue('B' . $row, $task['name']);
            $sheet->setCellValue('C' . $row, $task['description']);
            $sheet->setCellValue('D' . $row, $task['date_create']);
            $row++;
        }
        
        // Заголовки для списка выполненных задач
        $sheet->setCellValue('A' . $row + 2, 'Выполненные задачи');
        $sheet->setCellValue('A' . $row + 3, 'ID');
        $sheet->setCellValue('B' . $row + 3, 'Название');
        $sheet->setCellValue('C' . $row + 3, 'Описание');
        $sheet->setCellValue('D' . $row + 3, 'Дата создания');
        
        // Заполнение выполненных задач
        $row = $row + 4;
        foreach ($completeTasks as $task) {
            $sheet->setCellValue('A' . $row, $task['id']);
            $sheet->setCellValue('B' . $row, $task['name']);
            $sheet->setCellValue('C' . $row, $task['description']);
            $sheet->setCellValue('D' . $row, $task['date_create']);
            $row++;
        }
        
        // Создание графика (например, распределение задач по приоритетам)
        $labels = ['Низкий', 'Средний', 'Высокий'];
        $values = [1, 2, 0]; // Примерное количество задач по приоритетам (можно изменить)
        
        $dataSeriesLabels = [
            new DataSeriesValues(DataSeriesValues::DATASERIES_TYPE_STRING, 'Задачи', null, 0),
        ];
        
        $dataSeriesValues = [
            new DataSeriesValues(DataSeriesValues::DATASERIES_TYPE_NUMBER, 'Задачи!$B$13:$B$15', null, 3)
        ];
        
        $series = new DataSeries(
            DataSeries::TYPE_BARCHART,
            DataSeries::GROUPING_STANDARD,
            range(0, count($values) - 1),
            $dataSeriesLabels,
            $values,
            $labels
        );
        
        $plotArea = new PlotArea(null, [$series]);
        $chart = new Chart(
            'Задачи по приоритетам',
            new Title('Распределение задач по приоритетам'),
            new Legend(Legend::POSITION_BOTTOM, null, false),
            $plotArea,
            true,
            false
        );
        
        $chart->setTopLeftPosition('F2');
        $chart->setBottomRightPosition('M15');
        
        $sheet->addChart($chart);
        
        // Запись отчета в файл
        $writer = new Xlsx($spreadsheet);
        $writer->save('project_report.xlsx');
    }
}
