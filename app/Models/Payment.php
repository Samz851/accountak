<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'amount',
        'payment_method',
        'trans_id'
    ];

    public function transaction()
    {
        return $this->belongsTo(TransRecord::class, 'trans_id');
    }
}