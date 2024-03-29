<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'avatar', 
        'name', 
        'website', 
        'symbol', 
        'email', 
        'phone', 
        'address', 
        'city', 
        'country', 
        'primary',
        'departments',
        'setup'
    ];


    public function primary(): BelongsTo
    {
        return $this->belongsTo(User::class, 'primary');
    }

    public function agents(): HasMany
    {
        return $this->hasMany(User::class, 'organization');
    }

}
