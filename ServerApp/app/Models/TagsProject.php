<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagsProject extends Model
{
    use HasFactory;

    protected $hidden = [];
    public $timestamps = true;
    protected $fillable = [
        'tags_id',
        'project_id'
    ];

    protected $table = 'tags_project';
}
