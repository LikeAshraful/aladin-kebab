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
        Schema::create('app_setting_agent_policies', function (Blueprint $table) {
            $table->id();
            $table->string('policy_name', 200);
            $table->string('description', 500)->nullable();
            $table->boolean('is_active')->default(true);
            $table->double('domestic_amount')->nullable();
            $table->tinyInteger('domestic_amount_type')->comment('1=Amount | 2=Percent')->nullable();
            $table->double('domestic_max_amount');
            $table->double('international_amount');
            $table->tinyInteger('international_amount_type')->comment('1=Amount | 2=Percent')->nullable();
            $table->double('international_max_amount');
            $table->date('validation_date')->nullable();
            $table->foreignId('create_by_id')->constrained('users', 'id')->nullable();
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
        Schema::dropIfExists('app_setting_agent_policies');
    }
};
