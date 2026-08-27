<?php

namespace Tests\Feature;

use App\Models\Branch;
use App\Models\Reservation;
use Database\Seeders\DatabaseSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ReservationTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(DatabaseSeeder::class);
    }

    public function test_reservation_booking_page_renders(): void
    {
        $response = $this->get(route('reservations.create'));
        $response->assertStatus(200);
    }

    public function test_customer_can_book_table(): void
    {
        $branch = Branch::first();

        $payload = [
            'branch_id' => $branch->id,
            'customer_name' => 'Krzysztof Nowak',
            'customer_phone' => '+48 600 700 800',
            'customer_email' => 'krzysztof@example.com',
            'guests_count' => 4,
            'reservation_date' => now()->addDays(2)->toDateString(),
            'reservation_time' => '19:00',
            'seating_preference' => 'terrace',
            'notes' => 'Urodziny',
        ];

        $response = $this->post(route('reservations.store'), $payload);

        $this->assertDatabaseHas('reservations', [
            'customer_name' => 'Krzysztof Nowak',
            'guests_count' => 4,
            'seating_preference' => 'terrace',
        ]);

        $res = Reservation::where('customer_name', 'Krzysztof Nowak')->first();
        $response->assertRedirect(route('reservations.show', ['code' => $res->reservation_code]));
    }
}
