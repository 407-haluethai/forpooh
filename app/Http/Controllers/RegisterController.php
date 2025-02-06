<?php

namespace App\Http\Controllers;

use App\Models\Register;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;

class RegisterController extends Controller
{
    /**
     * Display a listing aof the resource.
     */
    public function index()
    {
        //
        // ดึงข้อมูลที่เกี่ยวข้อง
        $registers = Register::with(['student', 'course', 'teacher',])->get()->map(function ($register) {
            return [
                'id' => $register->id,
                'student_id' => $register->student->student_id,
                'student_name' => $register->student->name,  // ชื่อของนักศึกษา
                'title' => $register->course->title,    // ชื่อของหลักสูตร
                'course_code' => $register->course->course_code,  // รหัสหลักสูตร
            ];
        });

         // แปลง Collection เป็น Array ก่อนส่งไป React
            return Inertia::render('Registers/Index', [
            'registers' => $registers->toArray(),
        ]);

     }


    public function create()
    {
        return view('courses.create');
    }

    // Store a new course
    public function store(Request $request)
    {
        $request->validate([
            'course_code' => 'required|unique:courses',
            'name' => 'required',
            'credit' => 'required|integer',
        ]);

        Course::create($request->all());

        return redirect()->route('courses.index')
            ->with('success', 'Course created successfully.');
    }

    // Show a course's details
    public function show($id)
    {
        $course = Course::find($id);
        return view('courses.show', compact('course'));
    }

    // Show form to edit a course
    public function edit($id)
    {
        $course = Course::find($id);
        return view('courses.edit', compact('course'));
    }

    // Update a course
    public function update(Request $request, $id)
    {
        $request->validate([
            'course_code' => 'required|unique:courses,course_code,'.$id,
            'name' => 'required',
            'credit' => 'required|integer',
        ]);

        $course = Course::find($id);
        $course->update($request->all());

        return redirect()->route('courses.index')
            ->with('success', 'Course updated successfully.');
    }

    // Delete a course
    public function destroy($id)
    {
        $course = Course::find($id);
        $course->delete();

        return redirect()->route('courses.index')
            ->with('success', 'Cour se deleted successfully.');
    }
}
