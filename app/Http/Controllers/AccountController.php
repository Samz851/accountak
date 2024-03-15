<?php

namespace App\Http\Controllers;

use App\Helpers\ArrayFormatters;
use App\Models\Account;
use App\Models\AccountsBranch;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AccountController extends Controller
{
    private function getAll(): Collection | array
    {
        return Account::with('accountBranch:id,name')
                        ->get();
    }

    private function getAllByBranch(): Collection | array
    {
        return AccountsBranch::with('childBranches');
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

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
        if ($request->has('selectOptions')) {
            $result = $this->getSelectOptions();
        } else {
            $result = $this->getAll();
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
        $account->accountBranch;
        $account->debitTransactions;
        $account->creditTransactions;
        $account->contact;
        $acc = Account::where('id', $account->id)
                        ->with([
                            'accountBranch',
                            'debitTransactions.creditAccounts:account_name',
                            'creditTransactions.debitAccounts:account_name',
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
