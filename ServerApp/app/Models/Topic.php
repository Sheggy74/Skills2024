<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Topic extends Model
{
    protected $hidden = [];
    public $timestamps = false;
    protected $fillable = [
        'id',
        'name',
        'upper_level'
    ];

    protected $table = 'topics';
}
