<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Branch extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'address',
        'city',
        'postal_code',
        'lat',
        'lng',
        'phone',
        'email',
        'is_active',
        'opening_hours',
        'delivery_radius_km',
        'min_order_amount',
        'delivery_fee',
        'free_delivery_threshold',
        'estimated_prep_time_minutes',
        'estimated_delivery_time_minutes',
        'dine_in_capacity',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'opening_hours' => 'array',
            'lat' => 'float',
            'lng' => 'float',
            'delivery_radius_km' => 'float',
            'min_order_amount' => 'float',
            'delivery_fee' => 'float',
            'free_delivery_threshold' => 'float',
            'estimated_prep_time_minutes' => 'integer',
            'estimated_delivery_time_minutes' => 'integer',
            'dine_in_capacity' => 'integer',
        ];
    }

    public function staff(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function reservations(): HasMany
    {
        return $this->hasMany(Reservation::class);
    }

    public function productAvailabilities(): HasMany
    {
        return $this->hasMany(BranchProductAvailability::class);
    }
}
