<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Register>
 */
class RegisterFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //กำหนดค่าเริ่มต้นให้กับฟิลด์ในตาราง registers
        return [
            'student_id' => \App\Models\Student::inRandomOrder()->first()->id ?? \App\Models\Student::factory()->create()->id,
            'course_id' => \App\Models\Course::inRandomOrder()->first()->id ?? \App\Models\Course::factory()->create()->id,
        ];
    }
}
