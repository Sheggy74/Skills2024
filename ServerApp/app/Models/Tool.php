<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tool extends Model
{
    use HasFactory;

    protected $hidden = [];

    protected $fillable = [
        'name'
    ];

    protected $table = 'tools';
}
