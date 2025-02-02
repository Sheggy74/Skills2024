<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deadline extends Model
{
    //дедлайн
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=true;

    protected $fillable = [
        'id',
        'task_id',
        'date'
    ];

    public function task()
    {
        return $this->belongsTo(Task::class);
    }

    protected $table = 'deadline';
}
