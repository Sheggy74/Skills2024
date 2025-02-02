<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StateTask extends Model
{
     //'запись изменения стадии задачи'
     use HasFactory;
 
     protected $hidden = [];
 
     public $timestamps=true;
 
     protected $fillable = [
         'id',
         'state_id',
         'task_id',
        //  'user_id'
     ];
 
     protected $table = 'state_task';
}
