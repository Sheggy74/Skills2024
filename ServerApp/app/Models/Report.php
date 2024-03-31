<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    use HasFactory;

    protected $hidden = [];

    protected $fillable = [
        'series',
        'x',
        'y',
        'experiments_id'
    ];

    protected $table = 'report';
}
