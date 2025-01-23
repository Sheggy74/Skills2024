<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Priority extends Model
{
    //приоритет задачи
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=false;

    protected $fillable = [
        'name'
    ];

    protected $table = 'priority';
}
