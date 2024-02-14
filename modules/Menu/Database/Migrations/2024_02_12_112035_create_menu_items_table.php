<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('menu_items', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->string('short_description')->nullable();
            $table->string('long_description')->nullable();
            $table->float('price');
            $table->float('discount')->nullable();
            $table->enum('discount_type', ['number', 'percentage'])->nullable();
            $table->string('image')->nullable();
            $table->boolean('status')->default(1);
            $table->boolean('featured')->default(0);
            $table->foreignId('menu_category_id')->constrained('menu_categories')->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('menu_items');
    }
};
