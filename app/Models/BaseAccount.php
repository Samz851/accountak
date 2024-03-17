<?php

namespace App\Models;

use App\Enums\BaseAccountTaxonomy;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Log;

abstract class BaseAccount extends Model
{
    /**
     * Required fields
     * 
     * name, description, code, taxonomy [branch/leaf]
     * 
     * Required relationship methods
     * parent, children, parentModel, childrenModel
     * 
     * 
     */

     protected $fillable = [
        'name',
        'description',
        'code',
        'taxonomy',
     ];

   //   protected $with = ['children', 'accounts'];

   //   public function parent(): BelongsTo
   //   {
   //      return $this->taxonomy === BaseAccountTaxonomy::BRANCH
   //              ? $this->belongsTo(class_basename($this), 'parent_id')
   //              : $this->belongsTo(AccountsBranch::class, 'parent_id');
   //   }
   //   public function children(): HasMany
   //   {
   //      return $this->taxonomy === BaseAccountTaxonomy::BRANCH
   //              ? $this->hasMany(class_basename($this), 'parent_id')
   //              : $this->hasMany(Account::class, 'parent_id');
                
   //   }

     public function scopeWithChildren(Builder $builder): void
     {
      Log::info(['tax' => class_basename($this), BaseAccountTaxonomy::BRANCH, BaseAccountTaxonomy::LEAF], [__LINE__, __FILE__]);
         // if ($this->taxonomy === BaseAccountTaxonomy::BRANCH) {
         //    $builder->with('children');
         // } else {
         //    $builder->with('accounts');
         // }
         // $builder->with(['children', 'accounts']);
     }

     public function scopeWithParent(Builder $builder): void
     {
         $builder->with('parent');
     }
}