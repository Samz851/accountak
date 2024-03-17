<?php

namespace App\Models;

use App\Enums\BaseAccountTaxonomy;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Log;

class AccountsBranch extends BaseAccount
{
    use HasFactory;

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    // protected $with = ['subbranches','accounts'];
    protected $appends = ['tree_path', 'balance', 'has_children'];

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
                    Log::info([$last->code, $newCode], [__LINE__, __FILE__]);

                } else {
                    $parentCode = self::where('id', intval($branch->parent_id))->first();
                    Log::info([$parentCode, $branch], [__LINE__, __FILE__]);

                    $lastCode = str_split($parentCode->code, 2);
                    Log::info([$parentCode, $lastCode], [__LINE__, __FILE__]);

                    // $codePart = array_pop($lastCode);
                    if ( count($lastCode) === 2  && $lastCode[1] === '00') {
                        $codePart = array_pop($lastCode);
                        $lastCode[] = '01';
                        Log::info([$parentCode, $lastCode], [__LINE__, __FILE__]);

                    } else {
                        $lastCode[] = '01';
                        Log::info([$parentCode, $lastCode], [__LINE__, __FILE__]);

                    }
                    $newCode = implode($lastCode);
                    Log::info([$parentCode, $newCode], [__LINE__, __FILE__]);
                }
                // $newCode = $last ?  $last->code + 1 : $type->parent_account_type + 1;
            } else {
                $last = self::whereNull('parent_id')
                            ->latest('code')->first();
                if ( $last ) {
                    $lastCode = str_split($last->code, 2);
                    $codePart = array_shift($lastCode);
                    array_unshift($lastCode, str_pad($codePart+1, 2, "0", STR_PAD_LEFT));
                    // $lastCode[] = str_pad($codePart++, 4, "0", STR_PAD_LEFT);
                    $newCode = implode($lastCode);
                    Log::info([$last->code, $newCode, $codePart], [__LINE__, __FILE__]);
                } else {
                    $newCode = '0100';
                }
            }

            $branch->code = $newCode;
        });
    }

    public function parent(): BelongsTo
    {
        return $this->belongsTo(AccountsBranch::class, 'parent_id');
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

    private function treePath($branch)
    {
        $paths = [];


    }

    public function getChildrenAttribute()
    {

        if ($this->taxonomy === BaseAccountTaxonomy::BRANCH) {
            
            $children = $this->subbranches()->get();
            // Log::info([$this->taxonomy, BaseAccountTaxonomy::BRANCH, $this->taxonomy == BaseAccountTaxonomy::BRANCH, $children], [__FILE__, __LINE__]);

        } else {
            $children = $this->accounts()->get();
            // Log::info([$this->taxonomy, $this->taxonomy == BaseAccountTaxonomy::BRANCH, $children], [__FILE__, __LINE__]);

        }

        return $children;
    }

    public function getBalanceAttribute()
    {
        // Log::info([$this->children, $this->getAttributes(), $this->attributes], [__FILE__, __LINE__]);
        return round($this->children->pluck('balance')->sum(), 2);
    }
    public function getTreePathAttribute()
    {
        $path = [];
        $path[] = $this->name;
        $child = $this->parent()->first() ;
        $hasParent = true;
        while ($hasParent) {
            if ( ! $child ) {
                $hasParent = false;
            } else {
                $path[] = $child->name;
                $child = $child->parent()->first(); 
            }
            
        }
        $treePath = implode('->', array_reverse($path));
        return $treePath;

    }

    public function getHasChildrenAttribute()
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
