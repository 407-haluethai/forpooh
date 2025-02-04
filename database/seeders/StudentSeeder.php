<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Student;
use App\Models\Course;
use App\Models\Teacher;
use App\Models\Register;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        Student::factory(10)->create();
        Course::factory(10)->create();
        Teacher::factory(10)->create();
        Register::factory(30)->create();
    }
}
