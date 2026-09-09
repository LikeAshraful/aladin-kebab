<?php

namespace Tests\Feature;

use App\Models\Branch;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Services\AnalyticsService;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class KdsAndAdminTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_admin_dashboard_accessible_to_super_admin(): void
    {
        $admin = User::where('email', 'admin@aladenkebab.pl')->first();

        $response = $this->actingAs($admin)->get(route('admin.dashboard'));

        $response->assertStatus(200);
    }

    public function test_analytics_service_metrics_returns_top_items(): void
    {
        $analyticsService = app(AnalyticsService::class);
        $metrics = $analyticsService->getMasterDashboardMetrics();

        $this->assertArrayHasKey('top_items', $metrics);
        $this->assertNotEmpty($metrics['top_items']);
        $this->assertArrayHasKey('total_qty', $metrics['top_items'][0]);
        $this->assertArrayHasKey('product_name', $metrics['top_items'][0]);
    }

    public function test_kds_feed_accessible_and_returns_orders(): void
    {
        $admin = User::where('email', 'admin@aladenkebab.pl')->first();

        $response = $this->actingAs($admin)->get(route('admin.kds.index'));
        $response->assertStatus(200);

        $apiResponse = $this->actingAs($admin)->getJson(route('admin.kds.fetch'));
        $apiResponse->assertStatus(200)->assertJsonStructure(['orders', 'timestamp']);
    }

    public function test_kds_advances_order_status(): void
    {
        $admin = User::where('email', 'admin@aladenkebab.pl')->first();
        $order = Order::where('order_status', 'pending')->first();

        $response = $this->actingAs($admin)->postJson(route('admin.kds.advance', ['order' => $order->id]));

        $response->assertStatus(200)
            ->assertJson(['success' => true, 'new_status' => 'in_kitchen']);

        $this->assertEquals('in_kitchen', $order->fresh()->order_status);
    }

    public function test_pos_receipt_endpoint_generates_esc_pos_text(): void
    {
        $admin = User::where('email', 'admin@aladenkebab.pl')->first();
        $order = Order::first();

        $response = $this->actingAs($admin)->getJson(route('admin.orders.receipt', ['order' => $order->id]));

        $response->assertStatus(200)
            ->assertJsonStructure(['receipt_text', 'order']);
    }

    public function test_branch_stock_toggle_product(): void
    {
        $admin = User::where('email', 'admin@aladenkebab.pl')->first();
        $branch = Branch::first();
        $product = Product::first();

        $response = $this->actingAs($admin)->postJson(route('admin.branches.toggle-product', ['branch' => $branch->id]), [
            'product_id' => $product->id,
            'is_in_stock' => false,
        ]);

        $response->assertStatus(200)->assertJson(['success' => true]);

        $this->assertFalse($product->isAvailableAtBranch($branch->id));
    }
}
