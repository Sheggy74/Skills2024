<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    //тэги(справочник)
    use HasFactory;

    protected $hidden = [];
    public $timestamps = false;
    protected $fillable = [
        'id',
        'name'
    ];

    protected $table = 'tags';
}
