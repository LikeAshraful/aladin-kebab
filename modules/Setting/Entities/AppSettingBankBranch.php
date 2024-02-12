<?php

namespace Modules\Setting\Entities;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppSettingBankBranch extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function bank()
    {
        return $this->belongsTo(AppSettingBank::class, 'bank_id', 'id');
    }

    public function created_by()
    {
        return $this->belongsTo(User::class, 'create_by_id', 'id');
    }
}
