<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Account extends Model
{
    use HasFactory;

    protected $fillable = [
        'account_name',
        'account_type',
        'parent_account_id',
    ];

    protected $with = ['childAccounts'];

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
        return $this->hasMany(TransRecord::class, 'debit_account_id');
    }

    public function creditTransactions()
    {
        return $this->hasMany(TransRecord::class, 'credit_account_id');
    }

    public function contact()
    {
        return $this->belongsTo(Contact::class, 'contact_id');
    }
}
