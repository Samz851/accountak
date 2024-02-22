<?php

namespace App\Http\Controllers;

use App\Models\Account;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AccountController extends Controller
{
    private function renameAttributesForTreeData(array $array)
    {
        $keys = [
            "account_name" => "title",
            "id" => "value",
            "child_accounts" => "children"
        ];
        $newKeys = ["title", "value", "children"];
        $newArray = [];
        foreach ($array as $key => $value) {
            if (array_key_exists($key, $keys)) {
                if (is_array($value)) {
                    $newArray[$keys[$key]] = array_map([$this, 'renameAttributesForTreeData'], $value);
                } else {
                    $newArray[$keys[$key]] = $value;
                }

            } else {
                $newArray[$key] = $value;
            }

        }
        return $newArray;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        $accounts = Account::with(['parentAccount', 'childAccounts', 'accountType'])
                                    ->inRandomOrder()
                                    ->paginate(10);
        return response($accounts->items());


    }

    /**
     * Get select options
     */
    public function getSelect(): Response
    {
        $results = Account::has('childAccounts')
        ->doesntHave('parentAccount')
        ->get()
        ->toArray();
    $resultsAdjusted = array_map(fn($result) => $this->renameAttributesForTreeData($result), $results);
    // $this->rename_array_keys($results, ["name", "id", "child_types"], ["title", "value", "children"]);
    return response($resultsAdjusted);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Account $account)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Account $account)
    {
        //
    }
}
