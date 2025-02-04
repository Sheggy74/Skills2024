<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ReportTask extends Model
{
    

    protected $hidden = [];
    public $timestamps=false;

    protected $fillable = [
        'id',
        'date',
        'description',
        'task_id',
        'percent'
    ];

    protected $table = 'report_task';
}
