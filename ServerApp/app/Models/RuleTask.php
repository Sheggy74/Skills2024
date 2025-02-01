<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RuleTask extends Model
{
 
    protected $hidden = [];

    public $timestamps=true;

    protected $fillable = [
        'id',
        'user_id',
        'task_id'
    ];

    protected $table = 'rule_task';
}
