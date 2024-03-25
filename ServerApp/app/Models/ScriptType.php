<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScriptType extends Model
{
    use HasFactory;

    protected $hidden = [];

    protected $fillable = [
        'id',  'scripttype'
    ];

    protected $table = 'scripttype';
}
