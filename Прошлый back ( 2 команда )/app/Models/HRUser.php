<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HRUser extends Model
{
    use HasFactory;

    public function hrdepartment()
    {
        return $this->belongsTo(HRDepartment::class);
    }

    public function hrpost()
    {
        return $this->belongsTo(HRPost::class);
    }


}
