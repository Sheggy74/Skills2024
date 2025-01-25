<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function __invoke() : Collection
    {
        return Role::all();
    }
}
