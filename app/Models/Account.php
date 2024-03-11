<?php

namespace App\Models;

use App\Enums\AccountTransactionTypes;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Facades\Log;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_name',
        'account_type',
        'code',
        'parent_account_id',
    ];

    protected $with = ['childAccounts'];

    protected $appends = ['balance', 'code_label'];

    protected static function booted(): void
    {
        static::creating(function($account) {
            if ( isset($account->parent_account_id) ) {
                $last = self::where('parent_account_id', $account->parent_account_id)
                            ->latest('code')->first();
                if ( $last ) {
                    $codeParts = explode('.', $last->code);
                    $popped = array_pop($codeParts);
                    $popped += 1;
                    array_push($codeParts, $popped);
                    $newCode = implode('.', $codeParts);
                } else {
                    $parentCode = self::find($account->parent_account_id)->first();
                    $newCode = $parentCode->code . '.' . '1';
                }
            } else {
                $last = self::whereNull('parent_account_id')
                            ->latest('code')->first();
                $newCode = $last ? $last->code + 1 : 1;
            }

            $account->code = $newCode;
        });
    }

    public function accountType(): BelongsTo
    {
        return $this->belongsTo(AccountType::class, 'account_type');
    }

    public function parentAccount()
    {
        return $this->belongsTo(Account::class, 'parent_account_id');
    }

    public function childAccounts()
    {
        return $this->hasMany(Account::class, 'parent_account_id');
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
        return  $totalCredit - $totalDebit;
        // return 'Hii';
    }

    public function getCodeLabelAttribute()
    {
        return $this->code . ' - ' . $this->account_name;
    }
    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }
}
