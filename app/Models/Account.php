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
        'account_branch',
        'code',
    ];

    protected $appends = ['balance', 'code_label'];

    protected static function booted(): void
    {
    }

    public function accountBranch(): BelongsTo
    {
        return $this->belongsTo(AccountsBranch::class, 'account_branch');
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
