<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeJob extends Model
{
     //'запись изменения стадии задачи'
     use HasFactory;
 
     protected $hidden = [];
 
     public $timestamps=true;
 
     protected $fillable = [
         'id',
         'date_start',
         'date_end',
         'state_task_id',
         'task_id',
         'user_id'
     ];
 
     protected $table = 'time_job';
}
