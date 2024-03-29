<?php

namespace App\Http\Controllers;

use App\Http\Requests\ReportRequest;
use App\Models\Report;

class ReportsController extends Controller
{
    public function index()
    {
        $reports = Report::all();
        return response()->json($reports);
    }

    public function store(ReportRequest $request)
    {
        $report = Report::create($request->validated());
        return response()->json($report, 201);
    }

    public function update(ReportRequest $request, Report $report)
    {
        $report->update($request->validated());
        return response()->json($report);
    }

    public function destroy(Report $report)
    {
        $report->delete();
        return response()->json(null, 204);
    }
}
