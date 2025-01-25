<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    //проект
    use HasFactory;
    protected $hidden = [];

    public $timestamps=true;

    protected $fillable = [
        'id',
        'name',
        'description',
        'icon',
        'theme'
    ];

    protected $table = 'project';
}
