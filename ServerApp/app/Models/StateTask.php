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

    protected $table = 'state_task';
}
