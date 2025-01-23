<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Files extends Model
{
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=true;

    protected $fillable = [
        'id',
        'name',
        'data',
        'type',
        'size',
        'chat_id'
    ];

    protected $table = 'files';
}
