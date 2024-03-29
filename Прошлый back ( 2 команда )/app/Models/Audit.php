<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Audit extends Model
{
    use HasFactory;

    protected $fillable = [
        'table',
        'action',
        'old_values',
        'new_values',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
