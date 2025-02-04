<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //กำหนดค่าเริ่มต้นให้กับฟิลด์ในตาราง courses
        return [
            'course_code' => strtoupper(fake()->unique()->lexify('CS???')),
            'title' => fake()->sentence(3),
            'credits' => fake()->numberBetween(2, 4),
        ];
    }
}
