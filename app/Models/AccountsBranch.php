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
        'parent_accounts_branch',
        'code'
    ];

    /**
     * The relationships that should always be loaded.
     *
     * @var array
     */
    protected $with = ['childBranches'];
    protected $appends = ['tree_path'];

    protected static function booted(): void
    {
        static::creating(function($branch) {
            if ( isset($branch->parent_accounts_branch) ) {
                $last = self::where('parent_accounts_branch', $branch->parent_accounts_branch)
                            ->latest('code')->first();
                if ( $last ) {
                    $lastCode = str_split($last->code, 2);
                    $codePart = array_pop($lastCode);
                    $lastCode[] = str_pad($codePart+1, 2, "0", STR_PAD_LEFT);
                    $newCode = implode($lastCode);
                    Log::info([$last->code, $newCode], [__LINE__, __FILE__]);

                } else {
                    $parentCode = self::where('id', intval($branch->parent_accounts_branch))->first();
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
                $last = self::whereNull('parent_accounts_branch')
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

    public function parentBranch(): BelongsTo
    {
        return $this->belongsTo(AccountsBranch::class, 'parent_accounts_branch');
    }

    public function childBranches(): HasMany
    {
        return $this->hasMany(AccountsBranch::class, 'parent_accounts_branch');
    }

    public function accounts(): HasMany
    {
        return $this->hasMany(Account::class, 'account_branch_id');
    }

    private function treePath($branch)
    {
        $paths = [];


    }
    public function getTreePathAttribute()
    {
        $path = [];
        $path[] = $this->name;
        $child = $this->parentBranch()->first() ;
        $hasParent = true;
        while ($hasParent) {
            if ( ! $child ) {
                $hasParent = false;
            } else {
                $path[] = $child->name;
                $child = $child->parentBranch()->first(); 
            }
            
        }
        $treePath = implode('->', array_reverse($path));
        return $treePath;

    }
}
