<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deadlime extends Model
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

    protected $table = 'deadline';
}
