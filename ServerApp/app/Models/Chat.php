<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chat extends Model
{
    //чат задачи
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=false;

    protected $fillable = [
        'id',
        'task_id',
        'user_id',//автор
        'message',
        'date_create'
    ];

    protected $table = 'chat';
}
