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
use Maatwebsite\Excel\Concerns\WithCharts;
use App\Http\Resources\ToolResource;
use App\Models\Tool;

class ReportController extends Controller
{
   
    public function report() {

        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();

        $worksheet = $spreadsheet->getActiveSheet();
        $worksheet->fromArray([
        [2],
        [21],
        [86],
        [69],
        [0],
        ], NULL,'F4');

        $data =  Tool::query()->get();
        $object=[];
        $date=date("Y-m-d H:i:s");
        array_push($object,['№','Наименование параметра','Результат измерения','Комментарии']);
        foreach ($data as $value) {
            $row=[];
            array_push($row,$value->id);
            array_push($row,$value->name);
            array_push($row,$value->created_at);
            array_push($row,$value->created_at);
            array_push($object,$row);
        }
        $worksheet->getColumnDimension('A')->setWidth(25, 'pt');
        $worksheet->getColumnDimension('B')->setWidth(100, 'pt');
        $worksheet->getColumnDimension('C')->setWidth(100, 'pt');
        $worksheet->getColumnDimension('D')->setWidth(100, 'pt');
        $worksheet->getColumnDimension('E')->setWidth(100, 'pt');

        $worksheet = $spreadsheet->getActiveSheet();
        $worksheet->setTitle('Отчет');
        $worksheet->mergeCells('A1:C1');
        $worksheet->setCellValue('A1', 'Результаты измерений');
        $worksheet->setCellValue('D1', 'Дата проведения:');
        $worksheet->setCellValue('E1', $date);
        $spreadsheet->getActiveSheet()
        ->fromArray(
            $object, 
            NULL,       
            'A3'        
        );

        $dataSeriesLabels = [
        new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('String', 'C3', null, 1),
        ];

        $xAxisTickValues = [
        new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('String', 'B4:B'.count($data)+3, null), 
        ];

        $dataSeriesValues = [
        new \PhpOffice\PhpSpreadsheet\Chart\DataSeriesValues('Number', 'F4:F'.count($data)+3, null),
        ];

        $series = new \PhpOffice\PhpSpreadsheet\Chart\DataSeries(
        \PhpOffice\PhpSpreadsheet\Chart\DataSeries::TYPE_PIECHART, 
        null, 
        range(0, count($dataSeriesValues) - 1), 
        $dataSeriesLabels, 
        $xAxisTickValues, 
        $dataSeriesValues 
        );

        $layout = new \PhpOffice\PhpSpreadsheet\Chart\Layout();
        $layout->setShowVal(true);
        $layout->setShowPercent(true);

        $plotArea = new \PhpOffice\PhpSpreadsheet\Chart\PlotArea($layout, [$series]);
        $legend = new \PhpOffice\PhpSpreadsheet\Chart\Legend(\PhpOffice\PhpSpreadsheet\Chart\Legend::POSITION_RIGHT, null, false);

        $title = new \PhpOffice\PhpSpreadsheet\Chart\Title('Test Pie Chart');

        $chart = new Chart(
        'chart', 
        $title, 
        $legend, 
        $plotArea, 
        true, 
        0,
        null, 
        null   
        );

        $chart->setTopLeftPosition('A7');
        $chart->setBottomRightPosition('H20');
        $worksheet->addChart($chart);
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment;filename="myfile.xlsx"');
        header('Cache-Control: max-age=0');

        $filename ='excel-pie-chart.xlsx';
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
}
