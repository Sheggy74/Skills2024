<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use function PHPSTORM_META\map;

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
        'date_create',
        'project_id',
        'user_id',//создатель задачи
        'ptask_id',//родитель задачи(если это подзадача)
        'priority_id',
        'state_id',
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'rule_task', 'task_id', 'user_id');
    }

    public function priority()
    {
        return $this->belongsTo(Priority::class, 'priority_id');
    }

    public function state()
    {
        return $this->belongsToMany(StateTask::class, 'state_task', 'task_id', 'state_id')
            ->withPivot('created_at')
            ->orderBy('state_task.created_at', 'desc');
    }



    protected $table = 'task';
}
