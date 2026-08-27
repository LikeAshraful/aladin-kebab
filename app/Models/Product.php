<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'category_id',
        'name',
        'description',
        'slug',
        'base_price',
        'image_url',
        'badge',
        'spiciness_level',
        'is_vegetarian',
        'is_available',
        'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'array',
            'description' => 'array',
            'base_price' => 'float',
            'spiciness_level' => 'integer',
            'is_vegetarian' => 'boolean',
            'is_available' => 'boolean',
            'sort_order' => 'integer',
        ];
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function modifierGroups(): BelongsToMany
    {
        return $this->belongsToMany(ModifierGroup::class, 'product_modifier_group')
            ->withPivot('sort_order')
            ->orderByPivot('sort_order');
    }

    public function branchAvailabilities(): HasMany
    {
        return $this->hasMany(BranchProductAvailability::class);
    }

    public function isAvailableAtBranch(int $branchId): bool
    {
        if (! $this->is_available) {
            return false;
        }

        $branchAvailability = $this->branchAvailabilities
            ->firstWhere('branch_id', $branchId);

        return $branchAvailability ? $branchAvailability->is_in_stock : true;
    }
}
