<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{

    protected $hidden = [];

    public $timestamps=true;

    protected $fillable = [
        'id',
        'name',
        'data',
        'type',
        'size'
    ];

    protected $table = 'photos';
}
