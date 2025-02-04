<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Teacher extends Model
{

    use HasFactory;
    //กำหนดชื่อตารางในฐานข้อมูล
    protected $fillable = ['name', 'email'];

}

