<?php

namespace Modules\Setting\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Setting\Entities\AppSettingAgentPolicy;

class AgentPolicyTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Model::unguard();

        // $this->call("OthersTableSeeder");

        AppSettingAgentPolicy::insert([
            [
                'policy_name' => 'six point five policy   ',
                'description' => 'Gold user',
                'is_active' => 1,
                'domestic_amount' => 7,
                'domestic_amount_type' => 2,
                'domestic_max_amount' => 0,

                'international_amount' => 6.5,
                'international_amount_type' => 2,
                'international_max_amount' => 20000.0,
                'validation_date' => now()->addYear()->format('Y-m-d'),

                'create_by_id' => 1,
                'created_at' => now()->format('Y-m-d H:i:s'),
                'updated_at' => now()->format('Y-m-d H:i:s'),
            ],

        ]);
    }
}
