<?php

namespace App\Http\Controllers;


use App\Service\AdminService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class test extends Controller
{
    public function index(Request $request)
    {
        $service = new AdminService();

        dd($service->parseXML('data.xml'));
    }
}
