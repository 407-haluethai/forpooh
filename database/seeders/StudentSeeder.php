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
        // สร้างข้อมูลนักศึกษา, วิชา, และอาจารย์
        $students = Student::factory(10)->create();
        $courses = Course::factory(10)->create();
        $teachers = Teacher::factory(10)->create();

        // สุ่มให้นักศึกษาลงทะเบียนเรียนหลายวิชา (Many-to-Many)
        foreach ($students as $student) {
            $student->courses()->attach( // ใช้ attach() เพื่อบันทึกใน pivot table registers
                $courses->random(rand(1, 5))->pluck('id')->toArray()
            );
        }
    }
}
