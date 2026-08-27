<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Support\Str;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'reservation_code',
        'branch_id',
        'user_id',
        'customer_name',
        'customer_phone',
        'customer_email',
        'guests_count',
        'reservation_date',
        'reservation_time',
        'seating_preference',
        'status',
        'notes',
        'table_assigned',
    ];

    protected function casts(): array
    {
        return [
            'guests_count' => 'integer',
            'reservation_date' => 'date',
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

    public static function generateCode(): string
    {
        return 'RES-'.strtoupper(Str::random(6));
    }
}
