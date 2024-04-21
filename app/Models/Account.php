<?php

namespace App\Models;

use App\Contracts\BaseAccount as BaseAccountContract;
use App\Enums\AccountTransactionTypes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Log;
use Laravel\Scout\Searchable;

class Account extends BaseAccount implements BaseAccountContract
{
    use HasFactory, Searchable;

    protected static function booted(): void
    {
        static::creating(function ($account) {
            $last = self::where('parent_id', $account->parent_id)
                ->latest('code')->first();
            if ($last) {
                $lastCode = str_split($last->code, 2);
                $codePart = array_pop($lastCode);
                $lastCode[] = str_pad($codePart + 1, 2, '0', STR_PAD_LEFT);
                $newCode = implode($lastCode);
            } else {
                $branchCode = AccountsBranch::where('id', intval($account->parent_id))->first();
                $newCode = $branchCode->code.str_pad('1', 10 - strlen($branchCode->code), '0', STR_PAD_LEFT);
            }

            $account->code = $newCode;
        });
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

    public function getBalanceAttribute(): float
    {
        $totalCredit = $this->creditTransactions()->get()->pluck('crtrans')->sum('amount') ?? 0;
        $totalDebit = $this->debitTransactions()->get()->pluck('dbtrans')->sum('amount') ?? 0;

        return round($totalCredit - $totalDebit, 2);
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }

    public function getHasChildrenAttribute(): bool
    {
        return false;
    }

    public function scopeLeaves(Builder $query): void
    {

    }

    public function scopeRoots(Builder $query): void
    {
        
    }
}
