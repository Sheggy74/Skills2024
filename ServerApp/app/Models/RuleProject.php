<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RuleProject extends Model
{
    //права к проекту
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=false;

    protected $fillable = [
        'id',
        'project_id',
        'user_id',
        'role_id'
    ];

    protected $table = 'rule_project';
}
