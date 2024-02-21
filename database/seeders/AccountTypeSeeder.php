<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\AccountType;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class AccountTypeSeeder extends Seeder
{

    private function generate(array $children, ?Model $parent = null)
    {
        if (! $parent) {
            foreach ($children as $childK => $childV) {
                if (is_int($childK)) {
                    AccountType::factory()
                        ->state(['name' => $childV])
                        ->create();
                } else {
                    $parentType = AccountType::factory()
                        ->state(['name' => $childK])
                        ->create();
                    $this->generate($childV, $parentType);
                }

            }

        } else {
            foreach ($children as $childK => $childV) {
                if (is_int($childK)) {
                    AccountType::factory()
                        ->state([
                            'name' => $childV,
                            'parent_account_type' => $parent->id
                        ])
                        ->create();
                } else {
                    $parentType = AccountType::factory()
                        ->state([
                            'name' => $childK,
                            'parent_account_type' => $parent->id
                        ])
                        ->create();
                    $this->generate($childV, $parentType);
                }

            }
        }
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $accountTypes = config('accounttypes');
        $this->generate(children: $accountTypes);
    }
}
