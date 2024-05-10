<?php

namespace App\Models;

use App\Enums\AccountTransactionTypes;
use Illuminate\Database\Eloquent\Relations\Pivot;

class AccountTransRecord extends Pivot
{
    protected $casts = [
        'type' => AccountTransactionTypes::class,
    ];
}
