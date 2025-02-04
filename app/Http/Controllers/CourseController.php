<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = $request->input('search');
        // ถ้ามีการค้นหา
        if ($query) {
            $courses = Course::where('course_code', 'LIKE', "%$query%")// ค้นหาตาม course_code
                ->orWhere('title', 'LIKE', "%$query%")// ค้นหาตาม title
                ->orWhere('credits', 'LIKE', "%$query%") // ค้นหาตาม credits
                ->get();
            return Inertia::render('Courses/Index', ['courses' => $courses]);
        }
        // ถ้าไม่มีการค้นหา
        $courses = Course::all();
        return Inertia::render('Courses/Index', ['courses' => $courses]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        //
    }
}
