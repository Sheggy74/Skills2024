<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DepartmentInfo extends Model
{
    protected $hidden = [];

    public $timestamps=false;
    protected $id = null;

    protected $fillable = [
        'name',
        'emp_count'
    ];

    protected $table = 'department_info';
}
