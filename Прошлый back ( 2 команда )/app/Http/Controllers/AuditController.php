<?php

namespace App\Http\Controllers;

use App\Models\Audit;

class AuditController extends Controller
{
    public function index()
    {
        $audits = Audit::all();
        return response()->json($audits);
    }
}
