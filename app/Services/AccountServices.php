<?php

namespace App\Services;

use App\Contracts\AccountService as AccountServiceContract;
use App\Helpers\ArrayFormatters;
use App\Models\AccountsBranch;
use BadMethodCallException;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Log;

class AccountServices implements AccountServiceContract
{
    private $filterCriterion = [
        'branch' => 'getAllByBranch',
        'select' => 'getSelectOptions',
        'parent' => 'getAllByBranch'
    ];
    public function __construct(){}

    private function getFilterMethodName(string $name): string
    {
        if (isset($this->filterCriterion[$name])) {
            return $this->filterCriterion[$name];
        }

        throw new BadMethodCallException('Invalid method name ' . $name);
    }

    public function getAccounts(array $filters = []): array|Collection
    {
        try {
            $method = $this->getFilterMethodName(array_key_first($filters) ?? 'branch');
            return $this->$method(array_values($filters)[0] ?? null);

        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function getSelectOptions(?int $parent = null): array
    {
        if (! $parent) {
            $accounts = AccountsBranch::doesntHave('parent')
                        ->get()
                        ->toArray();
        } else {
            $accounts = AccountsBranch::where('parent_id', $parent)
                        ->get()
                        ->toArray();
        }

        return array_map(fn($record) => ArrayFormatters::rename_array_keys($record, [
            "name" => "title",
            "id" => "key",
            "children" => "children"
        ]), $accounts);
    }

    public function getAllByBranch(?int $parent = null): array|Collection
    {
        if (! $parent) {

            $accounts = AccountsBranch::whereNull('parent_id')
                        ->get()
                        ->toArray();

            foreach ($accounts as &$value) {
                if ( $value['has_children'] && ! isset($value['children'])) {
                    $value['children'][] = ['name' => 'fake', 'id' => $value['id'] * 125];
                }
            }
        } else {
               
            $accounts = AccountsBranch::where('id', $parent)
                        ->first()
                        ->append('children')
                        ->children
                        ->toArray();
            Log::info($accounts, [__LINE__, __FILE__]);

            foreach ($accounts as &$value) {
                if ( $value['has_children'] && ! isset($value['children'])) {
                    $value['children'] = [];
                }
            }
        }
        return $accounts;
    }
}