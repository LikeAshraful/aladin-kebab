<?php

namespace Tests\Feature;

use App\Models\Branch;
use App\Models\Order;
use App\Models\Product;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class OrderPlacementTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_home_page_renders_with_branches_and_menu(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    public function test_nearest_branch_api_calculates_distance(): void
    {
        $response = $this->postJson('/api/branches/nearest', [
            'lat' => 50.3275,
            'lng' => 19.1294,
        ]);

        $response->assertStatus(200)
            ->assertJsonStructure([
                'nearest_branch',
                'distance_km',
                'is_deliverable',
            ]);
    }

    public function test_customer_can_place_order_with_modifiers(): void
    {
        $branch = Branch::first();
        $product = Product::first();

        $payload = [
            'branch_id' => $branch->id,
            'customer_name' => 'Jan Testowy',
            'customer_phone' => '+48 500 111 222',
            'customer_email' => 'jan@test.pl',
            'order_type' => 'delivery',
            'delivery_address' => [
                'street' => 'ul. Zamkowa',
                'building_number' => '10',
                'apartment' => '2',
                'city' => 'Będzin',
                'postal_code' => '42-500',
            ],
            'payment_method' => 'blik',
            'customer_notes' => 'Bez cebuli',
            'items' => [
                [
                    'product_id' => $product->id,
                    'quantity' => 2,
                    'modifiers' => [
                        [
                            'group_name' => 'Rozmiar',
                            'option_name' => 'Duży',
                            'price_modifier' => 6.00,
                        ],
                    ],
                ],
            ],
        ];

        $response = $this->post('/orders', $payload);

        $this->assertDatabaseHas('orders', [
            'customer_name' => 'Jan Testowy',
            'order_type' => 'delivery',
            'payment_method' => 'blik',
        ]);

        $order = Order::where('customer_name', 'Jan Testowy')->first();
        $this->assertNotNull($order);
        $this->assertCount(1, $order->items);

        $response->assertRedirect(route('orders.show', ['order' => $order->order_number]));
    }

    public function test_order_tracking_page_accessible(): void
    {
        $order = Order::first();

        $response = $this->get(route('orders.show', ['order' => $order->order_number]));

        $response->assertStatus(200);
    }
}
