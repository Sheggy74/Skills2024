<?php

namespace App\Http\Controllers;

use App\Service\ExecutorsService;
use Illuminate\Http\Request;

class ExecutorsController extends Controller
{
    //
    public function get(Request $request, ExecutorsService $executorsService)
    {
        return $executorsService->getExecutors($request);
    }
}
