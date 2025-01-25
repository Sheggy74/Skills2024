<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TagsUser extends Model
{
    use HasFactory;

    protected $hidden = [];
    public $timestamps = true;
    protected $fillable = [
        'tags_id',
        'user_id',
    ];

    protected $table = 'tags_user';
}
