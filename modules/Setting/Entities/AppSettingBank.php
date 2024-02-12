<?php

namespace Modules\Setting\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppSettingBank extends Model
{
    use HasFactory;

    protected $guarded = [];

    const CACHE_KEY = 'all_banks';

    public static function boot()
    {
        parent::boot();

        static::created(function ($model) {
            static::clearCache();
        });

        static::updated(function ($model) {
            static::clearCache();
        });

        static::deleted(function ($model) {
            static::clearCache();
        });
    }

    public static function clearCache()
    {
        cache()->forget(self::CACHE_KEY);
    }
}
