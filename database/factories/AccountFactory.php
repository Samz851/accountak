<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\AccountsBranch;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Account>
 */
class AccountFactory extends Factory
{
    // protected string $model = Account::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'account_name' => $this->faker->name(),
            'account_branch_id' => AccountsBranch::doesntHave('childBranches')->get()->random()->id,
            'contact_id' => null
        ];
    }
}
