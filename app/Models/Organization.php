<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    protected $with = ['options'];


    public function primary(): ?User
    {
        return User::find($this->primary);
    }

    public function agents(): HasMany
    {
        return $this->hasMany(User::class, 'organization_id');
    }

    public function options(): HasOne
    {
        return $this->hasOne(Options::class, 'organization_id');
    }

}
