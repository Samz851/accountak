<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\AccountsBranch>
 */
class AccountsBranchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'description' => $this->faker->realTextBetween($minNbChars = 160, $maxNbChars = 200, $indexSize = 2),
            'parent_accounts_branch' => null
        ];
    }
}
