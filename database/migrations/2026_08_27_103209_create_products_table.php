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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->json('name'); // {"pl": "Kebab Rollo", "en": "Rollo Kebab"}
            $table->json('description')->nullable();
            $table->string('slug')->unique();
            $table->decimal('base_price', 8, 2);
            $table->string('image_url')->nullable();
            $table->string('badge')->nullable(); // e.g. Bestseller, Nowość, Ostre
            $table->unsignedTinyInteger('spiciness_level')->default(0); // 0: None, 1: Mild, 2: Hot, 3: Mega Hot
            $table->boolean('is_vegetarian')->default(false);
            $table->boolean('is_available')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
