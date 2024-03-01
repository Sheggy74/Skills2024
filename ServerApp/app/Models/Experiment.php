<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Experiment extends Model
{
    use HasFactory;

    protected $hidden = [];

    protected $fillable = [
        'name',
        'number',
        'date',
        'user_id',
        'tool_id'
    ];

    protected $table = 'experiments';
}
