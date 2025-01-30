<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Notifications extends Model
{
    use HasFactory;
 
    protected $hidden = [];

    public $timestamps=true;

    protected $fillable = [
        'id',
        'user_id',
        'message',
        'is_read'
    ];

    protected $table = 'notifications';
}
