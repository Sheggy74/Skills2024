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

    public $timestamps = true;

    protected $fillable = [
        'id',
        'name',
        'description',
        'date_create',
        'user_id', //создатель задачи
        'ptask_id', //родитель задачи(если это подзадача)
        'priority_id',
        'state_id',
        'topic_id',
        'days',
        'order_number',
        'is_planned'
    ];

    // public function users()
    // {
    //     return $this->belongsToMany(User::class, 'rule_task', 'task_id', 'user_id');
    // }

    public function priority()
    {
        return $this->belongsTo(Priority::class, 'priority_id');
    }

    public function topic()
    {
        return $this->belongsTo(Topic::class, 'topic_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }


    public function states()
    {
        return $this->belongsToMany(State::class, 'state_task')->withTimestamps();
    }

    public function lastState()
    {
        return $this->hasOne(StateTask::class)->latest();
    }

    public function deadlines()
    {
        return $this->belongsToMany(Deadline::class, 'deadline')->withTimestamps();
    }

    public function deadline()
    {
        return $this->hasOne(Deadline::class)->orderBy('created_at','desc');
    }


    protected $table = 'task';
}
