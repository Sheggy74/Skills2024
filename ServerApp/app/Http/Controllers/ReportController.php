<?php

namespace App\Http\Controllers;
//require 'vendor/autoload.php';
use DB;
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
use PhpOffice\PhpSpreadsheet\Chart\Layout;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ReportController extends Controller
{

    public function report(Request $request, $id)
    {

        $data = Report::where('experiments_id', $id)->get();
        $values = ReportValues::where('experiments_id', $id)->get();
        $experiments = new ExperimentResource(Experiment::query()->find($id));
        $user = new UserResource(User::query()->find($experiments->user_id));
        $fio = $user->second_name . ' ' . substr($user->first_name, 0, 1) . '.' . substr($user->last_name, 0, 1) . '.';
        $array_data = [];
        $array_values = [];

        foreach ($data as $item) {
            $row = [];
            array_push($row, $item->series);
            array_push($row, $item->x);
            array_push($row, $item->y);
            array_push($array_data, $row);
        }

        foreach ($values as $item) {
            $row = [];
            array_push($row, $item->name);
            array_push($row, $item->description);
            array_push($row, $item->value);
            array_push($row, $item->conclusion);
            array_push($array_values, $row);
        }

        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $worksheet = $spreadsheet->getActiveSheet();

        $worksheet->setTitle('Отчет');

        $worksheet->setCellValue('A1', 'Испытание:')->getStyle('A1')->getFont()->setBold(true);
        $worksheet->setCellValue('A2', 'Инициатор:')->getStyle('A2')->getFont()->setBold(true);
        $worksheet->setCellValue('A3', 'Оборудование:')->getStyle('A3')->getFont()->setBold(true);
        $worksheet->setCellValue('D1', 'Дата:')->getStyle('D1')->getFont()->setBold(true);
        $worksheet->setCellValue('F1', 'Время:')->getStyle('F1')->getFont()->setBold(true);
        $worksheet->setCellValue('D2', '№ проведения')->getStyle('D2')->getFont()->setBold(true);
        $worksheet->setCellValue('M1', 'Расчетные величины')->getStyle('M1')->getFont()->setBold(true);
        $worksheet->setCellValue('M3', 'Наименование')->getStyle('M3')->getFont()->setBold(true);
        $worksheet->setCellValue('N3', 'Обозначение')->getStyle('N3')->getFont()->setBold(true);
        $worksheet->setCellValue('O3', 'Значение')->getStyle('O3')->getFont()->setBold(true);
        $worksheet->setCellValue('P3', 'Вывод')->getStyle('P3')->getFont()->setBold(true);
        $worksheet->setCellValue('A5', '№')->getStyle('A5')->getFont()->setBold(true);
        $worksheet->setCellValue('B5', 'x')->getStyle('B5')->getFont()->setBold(true);
        $worksheet->setCellValue('C5', 'y')->getStyle('C5')->getFont()->setBold(true);
        $worksheet->setCellValue('A' . count($array_data) + 5 + 1, 'SUM:');

        $worksheet->getStyle('A5:C' . count($array_data) + 5)->getBorders()->applyFromArray(
            [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_MEDIUM,
                    'color' => [
                        'rgb' => '808080'
                    ]
                ]
            ]
        );

        $worksheet->getStyle('M3:P' . count($array_values) + 3)->getBorders()->applyFromArray(
            [
                'allBorders' => [
                    'borderStyle' => Border::BORDER_MEDIUM,
                    'color' => [
                        'rgb' => '808080'
                    ]
                ]
            ]
        );

        $worksheet->getColumnDimension('A')->setWidth(100, 'px');
        $worksheet->getColumnDimension('D')->setWidth(100, 'px');
        $worksheet->getColumnDimension('M')->setWidth(100, 'px');
        $worksheet->getColumnDimension('N')->setWidth(100, 'px');
        $worksheet->getColumnDimension('O')->setWidth(100, 'px');
        $worksheet->getColumnDimension('P')->setWidth(150, 'px');
        $worksheet->getColumnDimension('M')->setWidth(150, 'px');
        $worksheet->getColumnDimension('B')->setWidth(150, 'px');
        $worksheet->getColumnDimension('E')->setWidth(150, 'px');

        $worksheet->mergeCells('M1:N1');

        $worksheet->fromArray($array_data, NULL, 'A6');
        $worksheet->fromArray($array_values, NULL, 'M4');
        $worksheet->setCellValue('B1', $experiments->name);
        $worksheet->setCellValue('E1', $experiments->date);
        $worksheet->setCellValue('B2', $fio);
        // $worksheet->setCellValue('B3',$experiments->tool['name']);
        $worksheet->setCellValue('E2', $experiments->number);

        $formulaSumX = '=SUM(B6:B' . count($array_data) + 5 + 1;
        $formulaSumX .= ')';
        $formulaSumY = '=SUM(C6:C' . count($array_data) + 5 + 1;
        $formulaSumY .= ')';
        $worksheet->setCellValue('B' . count($array_data) + 5 + 1, $formulaSumX);
        $worksheet->setCellValue('C' . count($array_data) + 5 + 1, $formulaSumY);

        $dataSeriesLabels = [new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('String', 'B5:C5', NULL)];
        $xAxisTickValues = [new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('Number', 'B6:B' . count($array_values) + 6, NULL)];
        $dataSeriesValues = [
            new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('Number', 'B6:B' . count($array_values) + 6, NULL),
            new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('Number', 'C6:C' . count($array_values) + 6, NULL)
        ];
        $series = new \PhpOffice\PhpSpreadsheet\Chart\DataSeries(
            \PhpOffice\PhpSpreadsheet\Chart\DataSeries::TYPE_BARCHART,
            null,
            range(0, count($dataSeriesValues) - 1),
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

        $labels = ['Выполненные задачи', 'Задачи в процессе', 'Ожидающие задачи'];  // Подписи
        $values = [25, 40, 35];  // Значения

        // Создание объекта серии данных для подписей
        $dataSeriesLabels = [
            new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues(
                \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues::DATASERIES_TYPE_STRING,
                'Sheet1!$A$1:$A$3', // Диапазон, содержащий подписи
                null,
                count($labels)
            )
        ];

        // Создание объекта серии данных для значений
        $dataSeriesValues = [
            new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues(
                \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues::DATASERIES_TYPE_NUMBER,
                'Sheet1!$B$1:$B$3', // Диапазон, содержащий значения
                null,
                count($values)
            )
        ];

        // Создание серии для графика
        $series = new \PhpOffice\PhpSpreadsheet\Chart\DataSeries(
            \PhpOffice\PhpSpreadsheet\Chart\DataSeries::TYPE_PIECHART, // Тип графика
            null, // Группировка данных не требуется для Pie chart
            range(0, count($dataSeriesValues) - 1),
            $dataSeriesLabels,  // Подписи
            array(),  // Значения по оси X не требуются для круговой диаграммы
            $dataSeriesValues  // Значения
        );

        // Установка параметров графика
        $plotArea = new \PhpOffice\PhpSpreadsheet\Chart\PlotArea(null, [$series]);
        $legend = new \PhpOffice\PhpSpreadsheet\Chart\Legend(\PhpOffice\PhpSpreadsheet\Chart\Legend::POSITION_BOTTOM, null, false);
        $title = new \PhpOffice\PhpSpreadsheet\Chart\Title('Распределение задач');

        // Создание графика
        $chart = new \PhpOffice\PhpSpreadsheet\Chart\Chart(
            'chart1',  // Идентификатор графика
            $title,
            $legend,
            $plotArea,
            true,
            'gap',  // Опциональный параметр для отображения "зазоров" между секторами
            null,
            null
        );

        // Установка позиции графика в листе
        $chart->setTopLeftPosition('D1');
        $chart->setBottomRightPosition('H15');

        // Добавление графика на лист
        $worksheet->addChart($chart);

        // Сохранение файла (опционально)
        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->setIncludeCharts(true);
        $writer->save('php://output');


        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="report.xlsx"');
        header('Cache-Control: max-age=0');

        $writer = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $writer->setIncludeCharts(true);
        $writer->save('php://output');
    }

    public function reportData()
    {

        return [
            [
                'id' => 1,
                'name' => 'M334-2',
                'value' => 2.23,
                'temperature' => 70,
                'date' => '2023-05-12',
            ],
            [
                'id' => 2,
                'name' => 'M334-3',
                'value' => 5,
                'temperature' => 90,
                'date' => '2023-12-12',
            ],
            [
                'id' => 3,
                'name' => 'M34-2',
                'value' => 25,
                'temperature' => 180,
                'date' => '2023-03-02',
            ]
        ];
    }

    public function data()
    {
        // $data = Experiment::query()->orderBy('id','desc')->get();
        // return ReportResource::collection($data);
        return [
            'data' => [
                array(
                    "id" => 10,
                    "name" => "Quae hic assumenda sequi.",
                    "number" => "123ZY-244657",
                    "date" => "2002-12-24",
                    "user" => array(
                        "second_name" => "Maribel",
                        "last_name" => "Marvin",
                        "first_name" => "Thalia"
                    ),
                    "tool" => "amet",
                    "report" => [],
                    "values" => []
                ),
                array(
                    "id" => 1,
                    "name" => "Accusantium rerum animi.",
                    "number" => "123ZY-244657",
                    "date" => "2001-05-05",
                    "user" => array(
                        "second_name" => "Wilhelmine",
                        "last_name" => "Ratke",
                        "first_name" => "Pamela"
                    ),
                    "tool" => "laboriosam",
                    "report" => [
                        array(
                            "id" => 1,
                            "series" => 1,
                            "x" => "0.116",
                            "y" => "0.081",
                            "experiments_id" => 1
                        ),
                        array(
                            "id" => 2,
                            "series" => 2,
                            "x" => "0.095",
                            "y" => "0.117",
                            "experiments_id" => 1
                        ),
                        array(
                            "id" => 3,
                            "series" => 3,
                            "x" => "0.088",
                            "y" => "0.094",
                            "experiments_id" => 1
                        ),
                        array(
                            "id" => 4,
                            "series" => 4,
                            "x" => "0.109",
                            "y" => "0.112",
                            "experiments_id" => 1
                        ),
                        array(
                            "id" => 5,
                            "series" => 5,
                            "x" => "0.117",
                            "y" => "0.108",
                            "experiments_id" => 1
                        )
                    ],
                    "values" => [
                        array(
                            "id" => 1,
                            "name" => "Максимальная дисперсия параллельных опредлений",
                            "description" => "S 2x max",
                            "value" => "0.0006125",
                            "conclusion" => null,
                            "experiments_id" => 1
                        ),
                        array(
                            "id" => 2,
                            "name" => "Сумма дисперсий параллельных определений",
                            "description" => "Сумма S 2x",
                            "value" => "0.0017025",
                            "conclusion" => null,
                            "experiments_id" => 1
                        ),
                        array(
                            "id" => 3,
                            "name" => "Значение критерия Кохрена",
                            "description" => "G",
                            "value" => "0.359",
                            "conclusion" => "дисперсия однородна",
                            "experiments_id" => 1
                        )
                    ]
                ),
            ],
        ];
    }

    function ReportProject($date)
    {
        // $project=Project::query()->where('id',$id)->get();
        // $allTasks=Task::query()->where('project_id',$id)->get();
        // $completeTasks=Task::query()->where('project_id',$id)->get();
        $dateTask=date("Y-m-d", strtotime($date));
        // dump($dateTask); 
        $taskMonth=Task::query()->select('task.name','users.first_name','users.second_name','users.last_name','state_task.created_at','task.topic_id')
        ->leftJoin('users','users.id','task.user_id')
        ->leftJoin('state_task','state_task.task_id','task.id')->
            where('state_task.state_id',3)
            // where(DB::raw("to_date(state_task.created_at,'yyyy-mm-dd')"),'=',"'".date('Y-m-d')."'")
            // ->whereYear('state_task.created_at',$dateTask['year'])
            // ->whereMonth('state_task.created_at',$dateTask['month'])
            // ->whereDay('state_task.created_at',$dateTask['day'])
            ->get();

            dd($taskMonth);
        // return $taskMonth;

        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();

        // Создаем лист и добавляем данные
        $worksheet = $spreadsheet->getActiveSheet();
        $worksheet->setTitle('Отчет котроля выполнения');

        // Пример данных о проекте
        // $project = [
        //     'id' => 1,
        //     'name' => 'Проект по разработке приложения',
        //     'description' => 'Проект, посвященный разработке нового мобильного приложения для организации задач.',
        //     'created_at' => '2025-01-01',
        // ];

        // Пример данных о задачах
        // $allTasks = [
        //     ['id' => 1, 'name' => 'Задача 1', 'description' => 'Описание задачи 1', 'date_create' => '2025-01-01'],
        //     ['id' => 2, 'name' => 'Задача 2', 'description' => 'Описание задачи 2', 'date_create' => '2025-01-02'],
        //     ['id' => 3, 'name' => 'Задача 3', 'description' => 'Описание задачи 3', 'date_create' => '2025-01-03'],
        // ];

        // $completeTasks = [
        //     ['id' => 1, 'name' => 'Задача 1', 'description' => 'Описание задачи 1', 'date_create' => '2025-01-01'],
        // ];

        // Добавляем информацию о проекте в начало отчета
        $worksheet->setCellValue('A1', 'Имя задачи:')
                ->setCellValue('','')

        // // Сделаем жирным шрифтом наименование колонок
        // $worksheet->getStyle('A1:A5')->getFont()->setBold(true);
        // $worksheet->getStyle('B1:B5')->getFont()->setBold(true);

        // // Заголовки для задач
        // $worksheet->setCellValue('A9', 'Задачи')
        //         ->setCellValue('A10', 'ID')
        //         ->setCellValue('B10', 'Название')
        //         ->setCellValue('C10', 'Описание')
        //         ->setCellValue('D10', 'Дата создания');

        // // Сделаем жирным шрифтом наименование колонок задач
        // $worksheet->getStyle('A10:D10')->getFont()->setBold(true);

        // // Заполняем данные задач
        // $row = 11;
        // foreach ($allTasks as $task) {
        //     $worksheet->setCellValue('A' . $row, $task['id'])
        //             ->setCellValue('B' . $row, $task['name'])
        //             ->setCellValue('C' . $row, $task['description'])
        //             ->setCellValue('D' . $row, $task['date_create']);
        //     $row++;
        // }

        // // Устанавливаем ширину столбцов для задач
        // $worksheet->getColumnDimension('A')->setWidth(10); // ID
        // $worksheet->getColumnDimension('B')->setWidth(20); // Название
        // $worksheet->getColumnDimension('C')->setWidth(30); // Описание
        // $worksheet->getColumnDimension('D')->setWidth(20); // Дата создания

        // // Добавляем рамки ко всем ячейкам с задачами
        // $worksheet->getStyle('A10:D' . ($row - 1))
        //         ->getBorders()
        //         ->applyFromArray([
        //             'allBorders' => [
        //                 'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
        //                 'color' => ['rgb' => '000000'],
        //             ],
        //         ]);

        // // Заголовки для выполненных задач
        // $worksheet->setCellValue('A' . $row + 2, 'Выполненные задачи')
        //         ->setCellValue('A' . $row + 3, 'ID')
        //         ->setCellValue('B' . $row + 3, 'Название')
        //         ->setCellValue('C' . $row + 3, 'Описание')
        //         ->setCellValue('D' . $row + 3, 'Дата создания');

        // // Сделаем жирным шрифтом наименование колонок для выполненных задач
        // $worksheet->getStyle('A' . ($row + 3) . ':D' . ($row + 3))->getFont()->setBold(true);

        // // Заполняем данные выполненных задач
        // $row = $row + 4;
        // foreach ($completeTasks as $task) {
        //     $worksheet->setCellValue('A' . $row, $task['id'])
        //             ->setCellValue('B' . $row, $task['name'])
        //             ->setCellValue('C' . $row, $task['description'])
        //             ->setCellValue('D' . $row, $task['date_create']);
        //     $row++;
        // }

        // // Устанавливаем ширину столбцов для выполненных задач
        // $worksheet->getColumnDimension('A')->setWidth(10); // ID
        // $worksheet->getColumnDimension('B')->setWidth(20); // Название
        // $worksheet->getColumnDimension('C')->setWidth(30); // Описание
        // $worksheet->getColumnDimension('D')->setWidth(20); // Дата создания

        // // Добавляем рамки ко всем ячейкам с выполненными задачами
        // $worksheet->getStyle('A' . ($row - count($completeTasks)) . ':D' . ($row - 1))
        //         ->getBorders()
        //         ->applyFromArray([
        //             'allBorders' => [
        //                 'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
        //                 'color' => ['rgb' => '000000'],
        //             ],
        //         ]);

        // // Добавляем отдельную таблицу для статистики
        // $worksheet->setCellValue('H25', 'Общее количество задач:')->setCellValue('I25', count($allTasks));
        // $worksheet->setCellValue('H26', 'Общее количество выполненных задач:')->setCellValue('I26', count($completeTasks));

        // // Сделаем жирным шрифтом наименование колонок статистики
        // $worksheet->getStyle('H' . ($row + 2) . ':I' . ($row + 3))->getFont()->setBold(true);

        // // Устанавливаем ширину столбцов для статистики
        // $worksheet->getColumnDimension('A')->setWidth(30);
        // $worksheet->getColumnDimension('B')->setWidth(20);

        // // Добавляем рамки для статистики
        // $worksheet->getStyle('H' . ($row + 2) . ':I' . ($row + 3))
        //         ->getBorders()
        //         ->applyFromArray([
        //             'allBorders' => [
        //                 'borderStyle' => \PhpOffice\PhpSpreadsheet\Style\Border::BORDER_THIN,
        //                 'color' => ['rgb' => '000000'],
        //             ],
        //         ]);


        // $dataSeriesLabels = [new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('String', 'H25:H26', NULL)];
        // $xAxisTickValues = [new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('Number', 'I25:I26', NULL)];
        // $dataSeriesValues = [new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('Number', 'I25:I26', NULL)];
        // // Создаем объект серии данных для диаграммы
        // $series = new DataSeries(
        //     DataSeries::TYPE_PIECHART,  // тип диаграммы
        //     null,                       // группировка
        //     range(0, count($dataSeriesValues) - 1),
        //     $dataSeriesLabels,
        //     $xAxisTickValues,
        //     $dataSeriesValues
        // );

        // // Создаем объект Layout
        // $layout = new Layout();
        // $layout->setShowVal(true);
        // $layout->setShowPercent(true);

        // // Создаем объект PlotArea с Layout и серией данных
        // $plotArea = new PlotArea($layout, [$series]);

        // // Настройка легенды
        // $legend = new Legend(Legend::POSITION_RIGHT, null, false);

        // // Заголовок для графика
        // $title = new Title('Распределение задач по приоритетам');

        // // Создаем объект диаграммы
        // $chart = new Chart(
        //     'chart',
        //     $title,
        //     $legend,
        //     $plotArea,
        //     true,
        //     'gap',
        //     null,
        //     null
        // );

        // // Устанавливаем позицию графика на листе
        // $chart->setTopLeftPosition('H2');
        // $chart->setBottomRightPosition('M20');

        // // Добавляем график на лист
        // $worksheet->addChart($chart);

        // // Устанавливаем заголовки для скачивания файла
        // header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // header('Content-Disposition: attachment;filename="project_report.xlsx"');
        // header('Cache-Control: max-age=0');

        // // Создаем объект для записи в файл Excel
        // $writer = IOFactory::createWriter($spreadsheet, 'Xlsx');

        // // Отправляем файл на скачивание
        // $writer->setIncludeCharts(true);
        // $writer->save('php://output');
    }
}
