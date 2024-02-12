<?php

namespace Modules\Setting\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Modules\Agent\Entities\AgentCategory;

class PredefinedAnswer extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(AgentCategory::class, 'category_id', 'id');
    }

    // protected static function boot()
    // {
    //     parent::boot();
    //     if (Auth::check()) {

    //         self::created(function ($model) {
    //             $model->created_by = Auth::id();
    //         });

    //         self::updating(function ($model) {
    //             $model->updated_by = Auth::id();
    //         });
    //     }

    // }

}
