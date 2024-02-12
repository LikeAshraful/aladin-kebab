<?php

namespace Modules\Setting\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AppSettingExcludeAirline extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected const CACHE_KEY = 'exclude_airlines';

    public static function get_exclude_airlines()
    {
        $exclude_airlines = cache()->remember(self::CACHE_KEY, now()->addDay(), function () {
            return self::get();
        });

        return $exclude_airlines;
    }

    // write boot method
    public static function boot()
    {
        parent::boot();
        static::saved(function () {
            cache()->forget(self::CACHE_KEY);
        });
        static::deleted(function () {
            cache()->forget(self::CACHE_KEY);
        });
    }
}
