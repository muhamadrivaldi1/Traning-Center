<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Training; // Pastikan model ini di-import

class TrainingSeeder extends Seeder
{
    public function run()
{
    $trainings = [
        [
            'name' => "Pelatihan Web Development",
            'image' => "/images/WEb Development.jpeg"
        ],
        [
            'name' => "UI / UX Design",
            'image' => "/images/UI UX.jpeg"
        ],
        [
            'name' => "Cyber Security",
            'image' => "/images/Cyber.jpeg"
        ],
        [
            'name' => "Data Science",
            'image' => "/images/Data.jpeg"
        ],
        [
            'name' => "Mobile Development",
            'image' => "/images/Mobile App.jpeg"
        ],
        [
            'name' => "Artificial Intelligence",
            'image' => "/images/AI.jpeg"
        ],
    ];

    foreach ($trainings as $t) {
        \App\Models\Training::updateOrCreate(
            ['name' => $t['name']], 
            [
                'cost' => 2500000, 
                'description' => 'Pelatihan intensif untuk meningkatkan skill ' . $t['name'],
                'duration' => '3 Bulan',
                'schedule' => 'Setiap Sabtu',
                'image' => $t['image'], // TAMBAHKAN INI
            ]
        );
    }
}
}