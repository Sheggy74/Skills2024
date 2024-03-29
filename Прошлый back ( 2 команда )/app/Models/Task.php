<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'task_type_id',
        'mnemocode',
        'description',
        'task_confidence_id'
    ];

    public function users()
    {
        return $this->belongsToMany(User::class, 'task_user', 'task_id', 'user_id');
    }

    public function taskRequests()
    {
        return $this->hasMany(TaskRequest::class);
    }

    public function task_type()
    {
        return $this->belongsTo(TaskType::class,  'task_type_id', 'id');
    }

    public function task_confidence()
    {
        return $this->belongsTo(TaskConfidence::class, 'task_confidence_id', 'id');
    }

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'task_roles');
    }
}
