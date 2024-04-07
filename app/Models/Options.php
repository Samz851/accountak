<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Options extends Model
{
    use HasFactory;

    protected $fillable = [
        'organization_id',
        'fiscal_cycle',
        'fiscal_year_start',
        'logo',
        'description',
        'option_1',
        'option_2',
        'option_3',
        'option_4',
    ];

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }
}
