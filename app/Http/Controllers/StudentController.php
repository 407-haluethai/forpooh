<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //ดึงข้อมูลนักเรียนทั้งหมดจากฐานข้อมูล
        $students = Student::all();
        return Inertia::render('Students/Index', ['students' => $students]);

    }


    public function create()
    {
        return view('students.create');
    }

    // Store a new student
    public function store(Request $request)
    {
        $request->validate([
            'student_id' => 'required|unique:students',
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
        ]);

        Student::create($request->all());

        return redirect()->route('students.index')
            ->with('success', 'Student created successfully.');
    }

    // Show a student's details
    public function show($id)
    {
        $student = Student::find($id);
        return view('students.show', compact('student'));
    }

    // Show form to edit a student
    public function edit($id)
    {
        $student = Student::find($id);
        return view('students.edit', compact('student'));
    }

    // Update a student
    public function update(Request $request, $id)
    {
        $request->validate([
            'student_id' => 'required|unique:students,student_id,'.$id,
            'name' => 'required',
            'email' => 'required|email',
            'phone' => 'required',
        ]);

        $student = Student::find($id);
        $student->update($request->all());

        return redirect()->route('students.index')
            ->with('success', 'Student updated successfully.');
    }

    // Delete a student
    public function destroy($id)
    {
        $student = Student::find($id);
        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Student deleted successfully.');
    }
}
