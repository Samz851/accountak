<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Log;

class AccountsBranch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'parent_account_branch',
        'code'
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['childTypes'];

    protected static function booted(): void
    {
    
    }

    public function parentType(): BelongsTo
    {
        return $this->belongsTo(AccountsBranch::class, 'parent_account_branch');
    }

    public function childTypes(): HasMany
    {
        return $this->hasMany(AccountsBranch::class, 'parent_account_branch');
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class, 'account_branch');
    }
}
