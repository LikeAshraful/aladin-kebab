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
        Schema::create('app_setting_bank_branches', function (Blueprint $table) {
            $table->id();
            $table->string('branch_name', 30);
            $table->string('address', 255)->nullable();
            $table->string('city', 30)->nullable();
            $table->string('country', 30)->nullable();
            $table->string('zip_postal_code', 12)->nullable();
            $table->boolean('is_active')->default(false);
            $table->foreignId('bank_id')->constrained('app_setting_banks')->nullable();
            $table->foreignId('create_by_id')->constrained('users', 'id')->nullable();
            $table->foreignId('update_by_id')->constrained('users', 'id')->nullable();
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
        Schema::dropIfExists('app_setting_bank_branches');
    }
};
