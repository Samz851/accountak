<?php

namespace App\Http\Controllers;

use App\Enums\AccountTransactionTypes;
use App\Models\TransRecord;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;

class TransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $transactions = TransRecord::with(["noteable", "debitAccounts", "creditAccounts", "payment"])
                                    ->paginate()
                                    ->items();
        return response($transactions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->all();
        $data['date'] = now();
        $debitAccounts = Arr::pull($data, 'debit_accounts', false);
        $creditAccounts = Arr::pull($data, 'credit_accounts', false);
        $createPayment = Arr::pull($data, 'issue_payment', false);
        $transaction = TransRecord::create($data);
        if ($debitAccounts) {
            foreach ($debitAccounts as $debitAccount) {
                $transaction->debitAccounts()->attach($debitAccount['id'], [
                    'type' => AccountTransactionTypes::DEBIT,
                    'amount' => $debitAccount['amount']
                ]);
            }
        }
        if ($creditAccounts) {
            foreach ($creditAccounts as $creditAccount) {
                $transaction->debitAccounts()->attach($creditAccount['id'], [
                    'type' => AccountTransactionTypes::CREDIT,
                    'amount' => $creditAccount['amount']
                ]);
            }
        }
        if ($createPayment) {
            $payment = $transaction->payment()->create(['date' => now(), 'amount' => $data['amount']]);
        }
        // Reload model with children
        $transaction = TransRecord::where('id', $transaction->id)
                                ->with(["noteable", "debitAccounts", "creditAccounts", "payment"])
                                ->first();

        return response($transaction);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
