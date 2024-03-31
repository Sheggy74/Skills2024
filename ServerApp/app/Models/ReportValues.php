<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportValues extends Model
{
    use HasFactory;

    protected $hidden = [];

    protected $fillable = [
        // 'experiments_id',
        'name',
        'description',
        'value',
        'conclusion'
    ];

    protected $table = 'report_values';
}
