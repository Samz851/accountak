<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AccountType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'parent_account_type',
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['childTypes'];

    public function parentType(): BelongsTo
    {
        return $this->belongsTo(AccountType::class, 'parent_account_type');
    }

    public function childTypes(): HasMany
    {
        return $this->hasMany(AccountType::class, 'parent_account_type');
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class, 'account_type');
    }
}
