<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            // General & Localization
            [
                'key' => 'app_name',
                'value' => 'Aladen Spicy Kebab',
                'group' => 'general',
                'type' => 'string',
                'description' => 'Nazwa restauracji / aplikacji',
            ],
            [
                'key' => 'app_tagline',
                'value' => 'Autentyczny Kebab i Dania z Grilla',
                'group' => 'general',
                'type' => 'string',
                'description' => 'Slogan marki',
            ],
            [
                'key' => 'app_default_locale',
                'value' => 'pl',
                'group' => 'general',
                'type' => 'string',
                'description' => 'Domyślny język systemu (pl / en)',
            ],
            [
                'key' => 'contact_email',
                'value' => 'kontakt@aladenkebab.pl',
                'group' => 'general',
                'type' => 'string',
                'description' => 'Główny e-mail kontaktowy',
            ],
            [
                'key' => 'contact_phone',
                'value' => '+48 32 765 43 21',
                'group' => 'general',
                'type' => 'string',
                'description' => 'Główny telefon kontaktowy',
            ],
            [
                'key' => 'currency_symbol',
                'value' => 'zł',
                'group' => 'general',
                'type' => 'string',
                'description' => 'Symbol waluty',
            ],
            [
                'key' => 'currency_code',
                'value' => 'PLN',
                'group' => 'general',
                'type' => 'string',
                'description' => 'Kod waluty ISO',
            ],
            [
                'key' => 'timezone',
                'value' => 'Europe/Warsaw',
                'group' => 'general',
                'type' => 'string',
                'description' => 'Strefa czasowa systemu',
            ],

            // Ordering & Kitchen
            [
                'key' => 'enable_online_ordering',
                'value' => true,
                'group' => 'ordering',
                'type' => 'boolean',
                'description' => 'Przyjmowanie zamówień online aktywne (Emergency Switch)',
            ],
            [
                'key' => 'enable_table_reservations',
                'value' => true,
                'group' => 'ordering',
                'type' => 'boolean',
                'description' => 'Rezerwacja stolików online aktywna',
            ],
            [
                'key' => 'default_prep_time_minutes',
                'value' => 20,
                'group' => 'ordering',
                'type' => 'integer',
                'description' => 'Domyślny szacowany czas przygotowania (minuty)',
            ],
            [
                'key' => 'tax_rate_percent',
                'value' => 8.0,
                'group' => 'ordering',
                'type' => 'float',
                'description' => 'Stawka podatku VAT dla gastronomii (%)',
            ],
            [
                'key' => 'auto_confirm_orders',
                'value' => false,
                'group' => 'ordering',
                'type' => 'boolean',
                'description' => 'Automatyczne przekazywanie opłaconych zamówień do kuchni',
            ],

            // Delivery & Pricing
            [
                'key' => 'min_order_amount',
                'value' => 35.0,
                'group' => 'delivery',
                'type' => 'float',
                'description' => 'Minimalna wartość zamówienia z dostawą (zł)',
            ],
            [
                'key' => 'free_delivery_threshold',
                'value' => 75.0,
                'group' => 'delivery',
                'type' => 'float',
                'description' => 'Darmowa dostawa od kwoty (zł)',
            ],
            [
                'key' => 'base_delivery_fee',
                'value' => 6.0,
                'group' => 'delivery',
                'type' => 'float',
                'description' => 'Domyślna opłata za dostawę (zł)',
            ],
            [
                'key' => 'max_delivery_radius_km',
                'value' => 12.0,
                'group' => 'delivery',
                'type' => 'float',
                'description' => 'Domyślny maksymalny zasięg dowozu (km)',
            ],

            // Receipt & Print
            [
                'key' => 'receipt_header',
                'value' => 'ALADEN SPICY KEBAB - KEBAB & GRILL',
                'group' => 'receipt',
                'type' => 'string',
                'description' => 'Nagłówek paragonu termicznego POS',
            ],
            [
                'key' => 'receipt_footer',
                'value' => "Dziękujemy za zamówienie!\nSmacznego i zapraszamy ponownie.",
                'group' => 'receipt',
                'type' => 'string',
                'description' => 'Stopka paragonu termicznego POS',
            ],

            // Notifications & KDS
            [
                'key' => 'kds_sound_enabled',
                'value' => true,
                'group' => 'notifications',
                'type' => 'boolean',
                'description' => 'Sygnał dźwiękowy dla nowych zamówień w KDS',
            ],
            [
                'key' => 'kds_refresh_interval_seconds',
                'value' => 15,
                'group' => 'notifications',
                'type' => 'integer',
                'description' => 'Interwał odświeżania KDS (sekundy)',
            ],
            [
                'key' => 'alert_email',
                'value' => 'admin@aladenkebab.pl',
                'group' => 'notifications',
                'type' => 'string',
                'description' => 'Adres e-mail do alertów i powiadomień',
            ],
        ];

        foreach ($settings as $settingData) {
            Setting::updateOrCreate(
                ['key' => $settingData['key']],
                $settingData
            );
        }

        Setting::flushCache();
    }
}
