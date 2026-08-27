<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_number',
        'branch_id',
        'user_id',
        'customer_name',
        'customer_phone',
        'customer_email',
        'order_type',
        'delivery_address',
        'table_number',
        'subtotal',
        'delivery_fee',
        'discount_amount',
        'total_amount',
        'payment_method',
        'payment_status',
        'order_status',
        'scheduled_at',
        'customer_notes',
        'kitchen_notes',
        'estimated_ready_at',
        'completed_at',
    ];

    protected function casts(): array
    {
        return [
            'delivery_address' => 'array',
            'subtotal' => 'float',
            'delivery_fee' => 'float',
            'discount_amount' => 'float',
            'total_amount' => 'float',
            'scheduled_at' => 'datetime',
            'estimated_ready_at' => 'datetime',
            'completed_at' => 'datetime',
        ];
    }

    public function branch(): BelongsTo
    {
        return $this->belongsTo(Branch::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public static function generateOrderNumber(): string
    {
        $prefix = 'ASK-'.date('Ymd');
        $lastOrder = static::where('order_number', 'like', "{$prefix}-%")
            ->orderBy('id', 'desc')
            ->first();

        $sequence = 1;
        if ($lastOrder) {
            $parts = explode('-', $lastOrder->order_number);
            $sequence = intval(end($parts)) + 1;
        }

        return sprintf('%s-%04d', $prefix, $sequence);
    }
}
