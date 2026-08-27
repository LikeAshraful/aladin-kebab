<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('branches', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('address');
            $table->string('city');
            $table->string('postal_code');
            $table->decimal('lat', 10, 7)->default(50.3275);
            $table->decimal('lng', 10, 7)->default(19.1294);
            $table->string('phone');
            $table->string('email')->nullable();
            $table->boolean('is_active')->default(true);
            $table->json('opening_hours')->nullable();
            $table->decimal('delivery_radius_km', 5, 2)->default(10.00);
            $table->decimal('min_order_amount', 8, 2)->default(35.00);
            $table->decimal('delivery_fee', 8, 2)->default(7.00);
            $table->decimal('free_delivery_threshold', 8, 2)->nullable()->default(80.00);
            $table->unsignedInteger('estimated_prep_time_minutes')->default(20);
            $table->unsignedInteger('estimated_delivery_time_minutes')->default(45);
            $table->unsignedInteger('dine_in_capacity')->default(40);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('branches');
    }
};
