<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StageTask extends Model
{
    //стадия выполнения задачи
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=false;

    protected $fillable = [
        'id',
        'name',
    ];

    protected $table = 'stage_task';
}
