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

    public function transactions()
    {
        return $this->hasMany(TransRecord::class, ['debit_account_id', 'credit_account_id']);
    }
}
