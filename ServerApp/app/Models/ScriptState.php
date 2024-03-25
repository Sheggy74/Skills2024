<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScriptState extends Model
{
    use HasFactory;

    protected $hidden = [];

    protected $fillable = [
        'id', 'state'
    ];

    protected $table = 'scriptstate';
}
