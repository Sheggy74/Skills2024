<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    //задачи проекта
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=true;

    protected $fillable = [
        'id',
        'name',
        'description',
        'project_id',
        'user_id',//создатель задачи
        'ptask_id',//родитель задачи(если это подзадача)
        'priority_id'
    ];

    protected $table = 'task';
}
