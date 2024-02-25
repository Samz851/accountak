<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class TransRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'description',
        'amount',
        'debit_account_id',
        'credit_account_id',
    ];

    public function notesPr(): MorphTo
    {
        return $this->morphTo();
    }

    public function debitAccount()
    {
        return $this->belongsTo(Account::class, 'debit_account_id');
    }

    public function creditAccount()
    {
        return $this->belongsTo(Account::class, 'credit_account_id');
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
