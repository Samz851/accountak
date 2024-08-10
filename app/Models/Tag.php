<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = [
        'label',
        'label_ar'
    ];

    public function accounts(): MorphToMany
    {
        return $this->morphedByMany(Account::class, 'taggable');
    }

    public function branches(): MorphToMany
    {
        return $this->morphedByMany(AccountsBranch::class, 'taggable');
    }
}
