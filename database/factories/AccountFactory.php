<?php

namespace Database\Factories;

use App\Models\Account;
use App\Models\AccountType;
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
            'account_type' => AccountType::doesntHave('childTypes')->get()->random()->id,
            'parent_account_id' => null
        ];
    }
}
