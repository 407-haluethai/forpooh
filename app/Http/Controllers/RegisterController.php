<?php

namespace App\Http\Controllers;

use App\Models\Register;
use Illuminate\Http\Request;
use Inertia\Inertia;


class RegisterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        // ดึงข้อมูลที่เกี่ยวข้อง
        $registers = Register::with(['student', 'course', 'teacher'])->get()->map(function ($register) {
            return [
                'id' => $register->id,
                'student_name' => $register->student->name,  // ชื่อของนักศึกษา
                'course_name' => $register->course->name,    // ชื่อของหลักสูตร
            ];
        });

         // แปลง Collection เป็น Array ก่อนส่งไป React
            return Inertia::render('Registers/Index', [
            'registers' => $registers->toArray(),
        ]);

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

    }

    /**
     * Display the specified resource.
     */
    public function show(Register $register)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Register $register)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Register $register)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Register $register)
    {
        //
    }
}
