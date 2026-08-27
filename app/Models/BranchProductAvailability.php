<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BranchProductAvailability extends Model
{
    use HasFactory;

    protected $table = 'branch_product_availability';

    protected $fillable = [
        'branch_id',
        'product_id',
        'is_in_stock',
    ];

    protected function casts(): array
    {
        return [
            'is_in_stock' => 'boolean',
        ];
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
