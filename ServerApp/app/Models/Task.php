<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //задачи проекта
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=false;

    protected $fillable = [
        'id',
        'name',
        'description',
        'project_id',
        'user_id',//создатель задачи
        'stage_task_id',//стадия задачи
        'date_start',//начало
        'date_end',//конец
        'ptask_id'//родитель задачи(если это подзадача)
    ];

    protected $table = 'task';
}
