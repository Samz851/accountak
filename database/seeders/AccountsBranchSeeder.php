<?php

namespace Database\Seeders;

use App\Models\Account;
use App\Models\AccountsBranch;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;

class AccountsBranchSeeder extends Seeder
{

    private function generate(array $children, ?Model $parent = null)
    {
        if (! $parent) {
            foreach ($children as $childK => $childV) {
                if (is_int($childK)) {
                    AccountsBranch::factory()
                        ->state(['name' => $childV])
                        ->create();
                } else {
                    $parentType = AccountsBranch::factory()
                        ->state(['name' => $childK])
                        ->create();
                    $this->generate($childV, $parentType);
                }

            }

        } else {
            foreach ($children as $childK => $childV) {
                if (is_int($childK)) {
                    AccountsBranch::factory()
                        ->state([
                            'name' => $childV,
                            'parent_accounts_branch' => $parent->id
                        ])
                        ->create();
                } else {
                    $parentType = AccountsBranch::factory()
                        ->state([
                            'name' => $childK,
                            'parent_accounts_branch' => $parent->id
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
        $accountsBranches = config('accounts_branches.branches');
        $this->generate(children: $accountsBranches);
    }
}
