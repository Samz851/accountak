<?php

namespace App\Http\Controllers;

use App\Models\Account;
use App\Services\AccountServices;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AccountController extends Controller
{
    public function __construct(private AccountServices $accountServices)
    {
    }

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
        $account = Account::create($request->except('tags'));

        if ( $request->has('tags') ) $account->attach($request->input('tags'));

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

    public function search(Request $request): Response
    {
        $result = $this->accountServices->searchAccounts($request->query('code'));
        return response(['success' => true, 'result' => $result]);
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
