<?php

namespace Modules\Setting\Entities;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppSettingAgentPolicy extends Model
{
    use HasFactory;

    protected $guarded = [];

    const AMOUNT_TYPES = [
        1 => 'Amount',
        2 => 'Percent',
    ];

    public function getIntAmountTypeText()
    {
        return self::AMOUNT_TYPES[$this->international_amount_type];
    }

    public function getDomesticAmountTypeText()
    {
        return self::AMOUNT_TYPES[$this->domestic_amount_type];
    }

    protected static function newFactory()
    {
        return \Modules\Setting\Database\factories\AppSettingPolicyFactory::new();
    }

    public function created_by()
    {
        return $this->belongsTo(User::class, 'create_by_id', 'id');
    }
}
