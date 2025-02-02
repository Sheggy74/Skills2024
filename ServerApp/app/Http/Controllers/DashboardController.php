<?php

namespace App\Http\Controllers;

use App\Service\DashboardService;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getMyProjects(Request $request, DashboardService $service)
    {
        return $service->getMyProjects($request);
    }
}
