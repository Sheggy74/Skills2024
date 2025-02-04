<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class ReportWork extends Model
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

    protected $table = 'report_work';
}
