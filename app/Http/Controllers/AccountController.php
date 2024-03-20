<?php

namespace App\Http\Controllers;

use App\Helpers\ArrayFormatters;
use App\Models\Account;
use App\Models\AccountsBranch;
use App\Services\AccountServices;
use Illuminate\Support\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Log;

class AccountController extends Controller
{

    public function __construct(private AccountServices $accountServices){}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): Response
    {
       $accounts = $this->accountServices->getAccounts($request->query());

        return response($accounts);
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
