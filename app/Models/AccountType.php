<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Log;

class AccountType extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'parent_account_type',
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
        static::creating(function($type) {
            if ( isset($type->parent_account_type) ) {
                $last = self::where('parent_account_type', $type->parent_account_type)
                            ->latest('code')->first();
                if ( $last ) {
                    $codeParts = explode('.', $last->code);
                    $popped = array_pop($codeParts);
                    $popped += 1;
                    array_push($codeParts, $popped);
                    $newCode = implode('.', $codeParts);
                } else {
                    $parentCode = self::find($type->parent_account_type)->first();
                    Log::info($parentCode, [__LINE__]);
                    $newCode = $parentCode->code . '.' . '1';
                }
                // $newCode = $last ?  $last->code + 1 : $type->parent_account_type + 1;
            } else {
                $last = self::whereNull('parent_account_type')
                            ->latest('code')->first();
                $newCode = $last ? $last->code + 1 : 1;
            }

            $type->code = $newCode;
        });
    }

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
