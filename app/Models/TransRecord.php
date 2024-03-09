<?php

namespace App\Models;

use App\Enums\AccountTransactionTypes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class TransRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'name',
        'description',
        'amount',
        'tax_id'
    ];

    public function noteable(): MorphTo
    {
        return $this->morphTo();
    }

    public function debitAccounts()
    {
        // return $this->belongsTo(Account::class, 'debit_account_id');
        return $this->belongsToMany(Account::class, 'account_trans_record')
                    ->using(AccountTransRecord::class)
                    ->withPivot(['type', 'amount'])
                    ->wherePivot('type', AccountTransactionTypes::DEBIT);
    }

    public function creditAccounts()
    {
        // return $this->belongsTo(Account::class, 'credit_account_id');
        return $this->belongsToMany(Account::class, 'account_trans_record')
                    ->using(AccountTransRecord::class)
                    ->withPivot(['type', 'amount'])
                    ->wherePivot('type', AccountTransactionTypes::CREDIT);
    }

    public function payment()
    {
        return $this->hasMany(Payment::class, 'trans_id');
    }

    public function relatedRecord()
    {
        return $this->belongsTo(TransRecord::class, 'trans_id');
    }

    public function tax()
    {
        return $this->belongsTo(Tax::class, 'tax_id');
    }
}
