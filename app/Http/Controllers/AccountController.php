<?php

namespace App\Http\Controllers;

use App\Helpers\ArrayFormatters;
use App\Models\Account;
use App\Models\AccountsBranch;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class AccountController extends Controller
{
    private function getAll(): Collection | array
    {
        return Account::with('parent:id,name')
                        ->get();
    }

    private function getAllByBranch(): Collection | array
    {
        // $array = AccountsBranch::where('taxonomy', 'leaf')
        // ->where('name', '<>', 'Tax Expense')
        // ->get();

        $lastBranches = AccountsBranch::whereNull('parent_id')->get()->toArray();
        foreach ($lastBranches as &$value) {
            if ( $value['has_children'] && ! isset($value['children'])) {
                $value['children'] = [];
            }
        }
        return ArrayFormatters::rename_array_keys($lastBranches, [
            "balance" => "text"
        ]);
    }

    private function getSelectOptions(): array
    {
        $accounts = Account::get()
                            ->toArray();

        return array_map(fn($record) => ArrayFormatters::rename_array_keys($record, [
            "code_label" => "title",
            "id" => "value"
        ]), $accounts);
    }

    public function testAccounts(Request $request): Response
    {
        return response($this->getAllByBranch());
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        if ($request->has('selectOptions')) {
            $result = $this->getSelectOptions();
        } else {
            $result = $this->getAllByBranch();
        }

        return response($result);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): Response
    {
        $account = Account::create($request->all());
        return response($account);
    }

    /**
     * Display the specified resource.
     */
    public function show(Account $account)
    {
        $account->parent;
        $account->debitTransactions;
        $account->creditTransactions;
        $account->contact;
        $acc = Account::where('id', $account->id)
                        ->with([
                            'parent',
                            'debitTransactions.creditAccounts:name',
                            'creditTransactions.debitAccounts:name',
                        ])
                        ->first();
        return response($acc);
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
