<?php

namespace App\Http\Controllers;

use App\Entity\NavigationButton;
use App\Models\User;
use App\Service\AuthService;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class WorkspaceController extends Controller
{

    public function showTasksForProject(Request $request) {
        return $request;
    }
}
