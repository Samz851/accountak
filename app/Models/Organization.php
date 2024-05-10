<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Organization extends Model
{
    use HasFactory;

    protected $fillable = [
        'logo',
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
        'onboarded',
    ];

    // protected $with = ['options'];

    protected static function booted(): void
    {
        static::created(function ($organization) {
            $organization->options()->create([
                'fiscal_year_start' => date('Y/m/d'),
            ]);
        });
    }

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
