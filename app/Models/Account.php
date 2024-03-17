<?php

namespace App\Models;

use App\Enums\AccountTransactionTypes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Number;

class Account extends BaseAccount
{
    use HasFactory;

    protected $appends = ['balance', 'code_label', 'tree_path'];

    // protected $with = ['']

    protected static function booted(): void
    {
        static::creating(function($account) {
            $last = self::where('parent_id', $account->parent_id)
                        ->latest('code')->first();
            if ( $last ) {
                $lastCode = str_split($last->code, 2);
                $codePart = array_pop($lastCode);
                $lastCode[] = str_pad($codePart+1, 2, "0", STR_PAD_LEFT);
                $newCode = implode($lastCode);
            } else {
                $branchCode = AccountsBranch::where('id', intval($account->parent_id))->first();
                $newCode = $branchCode->code . str_pad('1', 10 - strlen($branchCode->code), "0", STR_PAD_LEFT);
            }

            $account->code = $newCode;
        });
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(AccountsBranch::class, 'parent_id');
    }
    

    public function debitTransactions()
    {
        // return $this->hasMany(TransRecord::class, 'debit_account_id');
        return $this->belongsToMany(TransRecord::class, 'account_trans_record')
                    ->using(AccountTransRecord::class)
                    ->as('dbtrans')
                    ->withPivot(['type', 'amount'])
                    ->wherePivot('type', AccountTransactionTypes::DEBIT);
    }

    public function creditTransactions()
    {
        // return $this->hasMany(TransRecord::class, 'credit_account_id');
        return $this->belongsToMany(TransRecord::class, 'account_trans_record')
                    ->using(AccountTransRecord::class)
                    ->as('crtrans')
                    ->withPivot(['type', 'amount'])
                    ->wherePivot('type', AccountTransactionTypes::CREDIT);
    }

    public function getBalanceAttribute()
    {
        Log::info($this->creditTransactions()->get()->pluck('crtrans'), [__LINE__]);
        Log::info($this->debitTransactions()->get()->pluck('dbtrans'), [__LINE__]);
        $totalCredit = $this->creditTransactions()->get()->pluck('crtrans')->sum("amount") ?? 0;
        $totalDebit = $this->debitTransactions()->get()->pluck('dbtrans')->sum("amount") ?? 0;
        // return  Number::currency(round($totalCredit - $totalDebit, 2), in: 'EGP');
        return  round($totalCredit - $totalDebit, 2);
        // return 'Hii';
    }

    public function getCodeLabelAttribute()
    {
        return $this->code . ' - ' . $this->name;
    }
    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

    public function getTreePathAttribute()
    {
        $path = [];
        $path[] = $this->name;
        $child = $this->parent()->first() ;
        $hasParent = true;
        while ($hasParent) {
            if ( ! $child ) {
                $hasParent = false;
            } else {
                $path[] = $child->name;
                $child = $child->parent()->first(); 
            }
            
        }
        $treePath = implode('->', array_reverse($path));
        return $treePath;

    }
}
