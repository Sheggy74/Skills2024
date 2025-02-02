<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StateTask extends Model
{
    //стадия выполнения задачи
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=false;

    protected $fillable = [
        'id',
        'name',
        'project_id'
    ];

    public function task()
    {
        return $this->belongsToMany(Task::class, 'state_task', 'state_id', 'task_id')
            ->withPivot('created_at');
    }


    protected $table = 'state_task';
}
