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
        'id',
        'name'
    ];

    public function tasks()
    {
        return $this->hasMany(Task::class, 'priority_id');
    }

    protected $table = 'priority';
}
