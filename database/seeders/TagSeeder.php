<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tags = [
            'cash' => 'نقد',
            'assets' => 'اصول',
            'operation' => 'عمليات',
            'expenses' => 'مصاريف'
        ];

        foreach($tags as $k => $v) {
            Tag::factory()
                ->state(['label' => $k, 'label_ar' => $v])
                ->create();
        }
    }
}
