<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\AccountType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\Factories\Sequence;


class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $random = AccountType::doesntHave('childTypes')->get();
        // $one = $random->random()->id;
        // Log::info($random, [__LINE__, __FILE__]);
        // Log::info($one, [__LINE__, __FILE__]);
        Account::factory()
            ->count(10)
            ->create();
        Account::factory()
            ->count(33)
            ->state(new Sequence(
                fn (Sequence $sequence) => [
                    'parent_account_id' => Account::doesntHave('parentAccount')->get()->random()->id,
                ],
            ))
            ->create();
    }
}