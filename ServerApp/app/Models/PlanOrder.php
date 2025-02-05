<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PlanOrder extends Model
{
     protected $hidden = [];
     protected $id = false;
     protected $primaryKey = false;
 
     public $timestamps=false;
 
     protected $fillable = [
         'user_id',
         'order'
     ];

 
     protected $table = 'plan_order';
}
