<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    /**
     * Display the settings management view.
     */
    public function index(Request $request): Response
    {
        $settings = Setting::getAllGrouped();

        $timezones = [
            'Europe/Warsaw' => 'Europe/Warsaw (GMT+1 / GMT+2)',
            'Europe/Berlin' => 'Europe/Berlin (GMT+1 / GMT+2)',
            'Europe/London' => 'Europe/London (GMT / BST)',
            'Europe/Paris' => 'Europe/Paris (GMT+1 / GMT+2)',
            'UTC' => 'UTC',
        ];

        $availableLocales = [
            'pl' => 'Polski (PL)',
            'en' => 'English (EN)',
        ];

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
            'timezones' => $timezones,
            'availableLocales' => $availableLocales,
        ]);
    }

    /**
     * Update application settings.
     */
    public function update(Request $request): RedirectResponse
    {
        $group = $request->input('group', 'general');

        if ($group === 'general') {
            $validated = $request->validate([
                'app_name' => ['required', 'string', 'max:255'],
                'app_tagline' => ['nullable', 'string', 'max:255'],
                'app_default_locale' => ['required', 'string', 'in:pl,en'],
                'contact_email' => ['nullable', 'email', 'max:255'],
                'contact_phone' => ['nullable', 'string', 'max:50'],
                'currency_symbol' => ['required', 'string', 'max:10'],
                'currency_code' => ['required', 'string', 'max:10'],
                'timezone' => ['required', 'string', 'timezone'],
            ]);

            foreach ($validated as $key => $value) {
                Setting::set($key, $value, 'general', 'string');
            }

            // Also update super admin current session locale if default locale was updated
            if (isset($validated['app_default_locale'])) {
                $request->session()->put('locale', $validated['app_default_locale']);
                if ($user = $request->user()) {
                    $user->update(['preferred_language' => $validated['app_default_locale']]);
                }
            }
        } elseif ($group === 'ordering') {
            $validated = $request->validate([
                'enable_online_ordering' => ['required', 'boolean'],
                'enable_table_reservations' => ['required', 'boolean'],
                'default_prep_time_minutes' => ['required', 'integer', 'min:1', 'max:180'],
                'tax_rate_percent' => ['required', 'numeric', 'min:0', 'max:100'],
                'auto_confirm_orders' => ['required', 'boolean'],
            ]);

            Setting::set('enable_online_ordering', (bool) $validated['enable_online_ordering'], 'ordering', 'boolean');
            Setting::set('enable_table_reservations', (bool) $validated['enable_table_reservations'], 'ordering', 'boolean');
            Setting::set('default_prep_time_minutes', (int) $validated['default_prep_time_minutes'], 'ordering', 'integer');
            Setting::set('tax_rate_percent', (float) $validated['tax_rate_percent'], 'ordering', 'float');
            Setting::set('auto_confirm_orders', (bool) $validated['auto_confirm_orders'], 'ordering', 'boolean');
        } elseif ($group === 'delivery') {
            $validated = $request->validate([
                'min_order_amount' => ['required', 'numeric', 'min:0'],
                'free_delivery_threshold' => ['required', 'numeric', 'min:0'],
                'base_delivery_fee' => ['required', 'numeric', 'min:0'],
                'max_delivery_radius_km' => ['required', 'numeric', 'min:0.5', 'max:100'],
            ]);

            Setting::set('min_order_amount', (float) $validated['min_order_amount'], 'delivery', 'float');
            Setting::set('free_delivery_threshold', (float) $validated['free_delivery_threshold'], 'delivery', 'float');
            Setting::set('base_delivery_fee', (float) $validated['base_delivery_fee'], 'delivery', 'float');
            Setting::set('max_delivery_radius_km', (float) $validated['max_delivery_radius_km'], 'delivery', 'float');
        } elseif ($group === 'receipt') {
            $validated = $request->validate([
                'receipt_header' => ['nullable', 'string', 'max:500'],
                'receipt_footer' => ['nullable', 'string', 'max:500'],
            ]);

            Setting::set('receipt_header', $validated['receipt_header'] ?? '', 'receipt', 'string');
            Setting::set('receipt_footer', $validated['receipt_footer'] ?? '', 'receipt', 'string');
        } elseif ($group === 'notifications') {
            $validated = $request->validate([
                'kds_sound_enabled' => ['required', 'boolean'],
                'kds_refresh_interval_seconds' => ['required', 'integer', 'min:5', 'max:120'],
                'alert_email' => ['nullable', 'email', 'max:255'],
            ]);

            Setting::set('kds_sound_enabled', (bool) $validated['kds_sound_enabled'], 'notifications', 'boolean');
            Setting::set('kds_refresh_interval_seconds', (int) $validated['kds_refresh_interval_seconds'], 'notifications', 'integer');
            Setting::set('alert_email', $validated['alert_email'] ?? '', 'notifications', 'string');
        }

        Setting::flushCache();

        return back()->with('success', 'Ustawienia zostały pomyślnie zaktualizowane.');
    }
}
