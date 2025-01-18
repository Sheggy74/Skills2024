<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class test extends Controller
{
    public function index(Request $request)
    {
        DB::statement('SHOW search_path;');
    }
}
