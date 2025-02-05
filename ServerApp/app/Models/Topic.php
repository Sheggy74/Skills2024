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

    public function tasks()
    {
        return $this->hasMany(Task::class, 'priority_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_topics', 'topic_id', 'user_id');
    }

    protected $table = 'topics';
}
