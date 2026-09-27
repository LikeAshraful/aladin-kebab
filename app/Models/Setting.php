<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'key',
        'value',
        'group',
        'type',
        'description',
    ];

    protected function casts(): array
    {
        return [
            'value' => 'json',
        ];
    }

    /**
     * Get a setting value by key with caching.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $settings = Cache::rememberForever('app_settings_all', function () {
            return static::all()->keyBy('key');
        });

        $setting = $settings->get($key);

        if (! $setting) {
            return $default;
        }

        return $setting->value ?? $default;
    }

    /**
     * Set a setting value and clear the settings cache.
     */
    public static function set(string $key, mixed $value, string $group = 'general', string $type = 'string', ?string $description = null): self
    {
        $setting = static::updateOrCreate(
            ['key' => $key],
            [
                'value' => $value,
                'group' => $group,
                'type' => $type,
                'description' => $description,
            ]
        );

        Cache::forget('app_settings_all');

        return $setting;
    }

    /**
     * Get all settings grouped by their category.
     *
     * @return array<string, array<string, mixed>>
     */
    public static function getAllGrouped(): array
    {
        $all = static::orderBy('group')->orderBy('id')->get();
        $grouped = [];

        foreach ($all as $item) {
            $grouped[$item->group][$item->key] = [
                'id' => $item->id,
                'key' => $item->key,
                'value' => $item->value,
                'type' => $item->type,
                'description' => $item->description,
            ];
        }

        return $grouped;
    }

    /**
     * Clear the cached settings.
     */
    public static function flushCache(): void
    {
        Cache::forget('app_settings_all');
    }
}
