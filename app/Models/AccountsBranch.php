<?php

namespace App\Models;

use App\Contracts\BaseAccount as BaseAccountContract;
use App\Enums\BaseAccountTaxonomy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Log;

class AccountsBranch extends BaseAccount implements BaseAccountContract
{
    use HasFactory;

    
    protected static function booted(): void
    {
        static::creating(function($branch) {
            if ( isset($branch->parent_id) ) {
                $last = self::where('parent_id', $branch->parent_id)
                            ->latest('code')->first();
                if ( $last ) {
                    $lastCode = str_split($last->code, 2);
                    $codePart = array_pop($lastCode);
                    $lastCode[] = str_pad($codePart+1, 2, "0", STR_PAD_LEFT);
                    $newCode = implode($lastCode);
                } else {
                    $parentCode = self::where('id', intval($branch->parent_id))->first();

                    $lastCode = str_split($parentCode->code, 2);

                    // $codePart = array_pop($lastCode);
                    if ( count($lastCode) === 2  && $lastCode[1] === '00') {
                        $codePart = array_pop($lastCode);
                        $lastCode[] = '01';

                    } else {
                        $lastCode[] = '01';
                    }
                    $newCode = implode($lastCode);
                }
            } else {
                $last = self::whereNull('parent_id')
                            ->latest('code')->first();
                if ( $last ) {
                    $lastCode = str_split($last->code, 2);
                    $codePart = array_shift($lastCode);
                    array_unshift($lastCode, str_pad($codePart+1, 2, "0", STR_PAD_LEFT));
                    $newCode = implode($lastCode);
                } else {
                    $newCode = '0100';
                }
            }

            $branch->code = $newCode;
        });
    }

    public function subbranches(): HasMany
    {
        // Log::info([$this->taxonomy, $this->getAttributes(), $this->getAttribute('taxonomy'),$this->getAttributeValue('name')], [__FILE__, __LINE__]);
        return $this->hasMany(AccountsBranch::class, 'parent_id');
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class, 'parent_id');
    }

    public function getChildrenAttribute()
    {

        $children = $this->subbranches()->get();
        if ($children->isEmpty()) $children = $this->accounts()->get();
        return $children;
    }

    public function getBalanceAttribute(): float
    {
        // Log::info([$this->children, $this->getAttributes(), $this->attributes], [__FILE__, __LINE__]);
        return round($this->children->pluck('balance')->sum(), 2);
    }

    public function getHasChildrenAttribute(): bool
    {
        $this->children = [];
        if ($this->subbranches()->exists()) {
            return true;
        }
        if ( $this->accounts()->exists()) {
            return true;
        }
        
        return false;
    }
}
