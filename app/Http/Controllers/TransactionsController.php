<?php

namespace App\Http\Controllers;

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
        $transactions = TransRecord::with(["noteable", "debitAccount", "creditAccount", "payment"])
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
        $createPayment = Arr::pull($data, 'issue_payment', false);
        $transaction = TransRecord::create($data);
        if ($createPayment) {
            $payment = $transaction->payment()->create(['date' => now(), 'amount' => $data['amount']]);
        }
        // Reload model with children
        $transaction = TransRecord::find($transaction->id)
                                ->with(["noteable", "debitAccount", "creditAccount", "payment"])
                                ->get();

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