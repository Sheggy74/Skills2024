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

    public function getMyTasks(Request $request, DashboardService $service)
    {
        return $service->getMyTasks($request);
    }

    public function getSpentTime(Request $request, DashboardService $service)
    {
        return $service->getSpentTime($request);
    }

    public function getMyNotifications(Request $request, DashboardService $service)
    {
        return $service->getMyNotifications($request);
    }

    public function getMyChat(Request $request, DashboardService $service)
    {
        return $service->getMyChat($request);
    }

    public function getMyResults(Request $request, DashboardService $service)
    {
        return $service->getMyResults($request);
    }
}
