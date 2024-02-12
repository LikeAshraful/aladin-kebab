<?php

namespace Modules\Setting\Entities;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class AppSettingGds extends Model
{
    use HasFactory;

    protected $fillable = [
        'gds_name',
        'cert_client_id',
        'cert_client_secret',
        'prod_client_id',
        'prod_client_secret',
        'is_production',
        'cert_server',
        'prod_server',
        'target_city_cert',
        'target_city_prod',
        'is_active',
        'cert_soap_server',
        'prod_soap_server',
    ];

    public const CACHE_KEY = 'gds_list';

    protected $table = 'app_setting_gds';

    // boot
    protected static function boot()
    {
        parent::boot();
        self::creating(function ($model) {
            Cache::forget(self::CACHE_KEY);
        });
        self::updating(function ($model) {
            info('updating gds cache');
            Cache::forget(self::CACHE_KEY);
        });
        self::deleting(function ($model) {
            Cache::forget(self::CACHE_KEY);
        });

    }
}
