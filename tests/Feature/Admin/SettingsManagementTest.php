<?php

namespace Tests\Feature\Admin;

use App\Models\Setting;
use App\Models\User;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class SettingsManagementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_super_admin_can_view_settings_page(): void
    {
        $admin = User::where('email', 'admin@aladenkebab.pl')->first();

        $response = $this->actingAs($admin)->get(route('admin.settings.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page
            ->component('Admin/Settings/Index')
            ->has('settings')
            ->has('timezones')
            ->has('availableLocales')
        );
    }

    public function test_super_admin_can_update_general_settings(): void
    {
        $admin = User::where('email', 'admin@aladenkebab.pl')->first();

        $response = $this->actingAs($admin)->patch(route('admin.settings.update'), [
            'group' => 'general',
            'app_name' => 'Aladen Super Kebab HQ',
            'app_tagline' => 'Najlepszy Kebab w Regionie',
            'app_default_locale' => 'en',
            'contact_email' => 'hq@aladenkebab.pl',
            'contact_phone' => '+48 500 600 700',
            'currency_symbol' => 'zł',
            'currency_code' => 'PLN',
            'timezone' => 'Europe/Warsaw',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('success');

        $this->assertEquals('Aladen Super Kebab HQ', Setting::get('app_name'));
        $this->assertEquals('en', Setting::get('app_default_locale'));
        $this->assertEquals('hq@aladenkebab.pl', Setting::get('contact_email'));
    }

    public function test_super_admin_can_update_ordering_and_delivery_settings(): void
    {
        $admin = User::where('email', 'admin@aladenkebab.pl')->first();

        // Ordering settings
        $responseOrdering = $this->actingAs($admin)->patch(route('admin.settings.update'), [
            'group' => 'ordering',
            'enable_online_ordering' => false,
            'enable_table_reservations' => true,
            'default_prep_time_minutes' => 30,
            'tax_rate_percent' => 23.0,
            'auto_confirm_orders' => true,
        ]);

        $responseOrdering->assertRedirect();
        $this->assertFalse(Setting::get('enable_online_ordering'));
        $this->assertEquals(30, Setting::get('default_prep_time_minutes'));
        $this->assertEquals(23.0, Setting::get('tax_rate_percent'));
        $this->assertTrue(Setting::get('auto_confirm_orders'));

        // Delivery settings
        $responseDelivery = $this->actingAs($admin)->patch(route('admin.settings.update'), [
            'group' => 'delivery',
            'min_order_amount' => 45.0,
            'free_delivery_threshold' => 100.0,
            'base_delivery_fee' => 8.5,
            'max_delivery_radius_km' => 15.0,
        ]);

        $responseDelivery->assertRedirect();
        $this->assertEquals(45.0, Setting::get('min_order_amount'));
        $this->assertEquals(100.0, Setting::get('free_delivery_threshold'));
        $this->assertEquals(8.5, Setting::get('base_delivery_fee'));
        $this->assertEquals(15.0, Setting::get('max_delivery_radius_km'));
    }

    public function test_branch_manager_cannot_access_settings(): void
    {
        $manager = User::where('email', 'bedzin.manager@aladenkebab.pl')->first();

        $response = $this->actingAs($manager)->get(route('admin.settings.index'));

        $response->assertStatus(403);
    }

    public function test_kitchen_staff_cannot_access_settings(): void
    {
        $kitchen = User::where('email', 'bedzin.kitchen@aladenkebab.pl')->first();

        $response = $this->actingAs($kitchen)->get(route('admin.settings.index'));

        $response->assertStatus(403);
    }

    public function test_unauthenticated_user_cannot_access_settings(): void
    {
        $response = $this->get(route('admin.settings.index'));

        $response->assertRedirect(route('login'));
    }

    public function test_super_admin_can_switch_locale(): void
    {
        $admin = User::where('email', 'admin@aladenkebab.pl')->first();

        $response = $this->actingAs($admin)->post(route('locale.set', ['locale' => 'en']));

        $response->assertRedirect();
        $response->assertSessionHas('locale', 'en');
        $this->assertEquals('en', $admin->fresh()->preferred_language);
    }
}
