<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class RoleProject extends Model
{
 
    protected $hidden = [];

    public $timestamps=false;

    protected $fillable = [
        'id',
        'name' 
    ];

    protected $table = 'role_project';
}
