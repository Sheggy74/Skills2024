<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class State extends Model
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

    public function tasks()
    {
        return $this->belongsToMany(Task::class, 'state_task')->withTimestamps();
    }

    protected $table = 'state';
}
