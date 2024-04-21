<?php

namespace App\Services;

use App\Contracts\AccountService as AccountServiceContract;
use App\Helpers\ArrayFormatters;
use App\Models\Account;
use App\Models\AccountsBranch;
use BadMethodCallException;
use Exception;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Facades\Log;

class AccountServices implements AccountServiceContract
{
    private $filters = [
        'type' => [
            'required' => true,
            'type' => 'string',
            'values' => ['account', 'branch', 'all'],
        ],
        'taxonomy' => [
            'required' => false,
            'type' => 'string',
            'values' => ['leaf', 'root'],
        ],
        'parent' => [
            'required' => false,
            'type' => 'string',
        ],
        '_start' => [
            'required' => false,
            'type' => 'string',
        ],
        '_end' => [
            'required' => false,
            'type' => 'string',
        ]
    ];

    private function extractFilters (array $filters): array
    {
        $keys = array_keys($this->filters);
        $queries = [];

        if ( ! isset($filters['type']) ) throw new Exception('Malformed filter');

        foreach ($filters as $key => $value) {
            if (array_key_exists($key, $this->filters) ) {
                if ( gettype($value) !== $this->filters[$key]['type'] ) throw new Exception('Malformed filter');
                if ( isset($this->filters[$key]['values'] ) && ! in_array($value, $this->filters[$key]['values']) ) throw new Exception('Malformed filter');
                $queries[$key] = $value;
            }
        }

        return $queries;
    }

    public function getAccounts(array $filters = []): array
    {
        try {
            if ( $filters ) {
                $queries = $this->extractFilters($filters);
                $accounts = new AccountQueryBuilder($filters['_start'] ?? 0, $filters['_end'] ?? 20);

                if ( $queries['type'] === 'all' )
                {
                    if ( !isset($queries['parent']) )
                    {
                        $accounts = $accounts->setType('branch')
                                    ->setTaxonomy('root')
                                    ->executeAccountQuery();
                    } else {
                        $accounts = AccountQueryBuilder::getChildren($queries['parent']);
                    }
                } else {
                    $accounts = $accounts->setType($queries['type']);
                    if ( isset($queries['taxonomy']) ) {
                        $accounts = $accounts->setTaxonomy($queries['taxonomy']);
                    }
                    if ( isset($queries['parent']) ) {
                        $accounts = $accounts->setParentId($queries['parent']);
                    }
                    $accounts = $accounts->executeAccountQuery();
                }
                $accounts = $accounts->toArray();
                foreach ($accounts as &$value) {
                    Log::info([$value['has_children'], gettype($value['has_children']), $value['has_children'] === true && ! isset($value['children'])], [__LINE__, __FILE__]);
                    if ( $value['has_children'] === true && ! isset($value['children'])) {
                        $value['children'] = [];
                    }
                }
                return $accounts;
            }
        } catch (\Throwable $th) {
            throw $th;
        }

    }
    private $filterCriterion = [
        'branch' => 'getAllByBranch',
        'select' => 'getSelectOptions',
        'parent' => 'getAllByBranch',
        'leaf' => 'getLeaves'
    ];

    private function getLeaves()
    {
        $accounts = Account::all();
        return array_map(fn($record) => ArrayFormatters::rename_array_keys($record, [
            "name" => "title",
            "id" => "key",
            "children" => "children"
        ]), $accounts->toArray());
    }
    public function __construct(){}

    private function getFilterMethodName(string $name): string
    {
        if (isset($this->filterCriterion[$name])) {
            return $this->filterCriterion[$name];
        }

        throw new BadMethodCallException('Invalid method name ' . $name);
    }

    public function getAccountsa(array $filters = []): array|Collection
    {
        try {
            $method = $this->getFilterMethodName(array_key_first($filters) ?? 'branch');
            $parent = gettype(array_values($filters)[0]) == 'integer' ? array_values($filters)[0] : null;
            return $this->$method( $parent);

        } catch (\Throwable $th) {
            throw $th;
        }
    }

    // private function getBranches($filters): Collection
    // {
    //     if ( isset($filters['taxonomy']) ) {
    //         if ( $filters['taxonomy'] === 'root' ) {
    //             $result = $this->getRootBranches();
    //         } else {
    //             $result = $this->getLeaves
    //         }
    //     }
    // }
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
                    $value['children'] = [[]];
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