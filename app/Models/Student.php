<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model {
    use HasFactory;
    // กำหนดชื่อตารางในฐานข้อมูล
    protected $fillable = ['student_id', 'name', 'email', 'phone'];

    public function registers()
    {
        return $this->hasMany(Register::class);
    }
}

