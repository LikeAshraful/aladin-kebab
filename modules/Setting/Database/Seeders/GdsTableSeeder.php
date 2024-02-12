<?php

namespace Modules\Setting\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Setting\Entities\AppSettingGds;

class GdsTableSeeder extends Seeder
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

        AppSettingGds::insert([
            [
                'gds_name' => 'your_default_value_for_gds_name',
                'cert_client_id' => 'your_default_value_for_cert_client_id',
                'cert_client_secret' => 'your_default_value_for_cert_client_secret',
                'prod_client_id' => 'your_default_value_for_prod_client_id',
                'prod_client_secret' => 'your_default_value_for_prod_client_secret',
                'is_production' => false, // or true, depending on your default
                'cert_server' => 'your_default_value_for_cert_server',
                'prod_server' => 'your_default_value_for_prod_server',
                'target_city_cert' => 'your_default_value_for_target_city_cert',
                'is_active' => false, // or true, depending on your default
                'target_city_prod' => 'your_default_value_for_target_city_prod',
                'cert_soap_server' => 'your_default_value_for_cert_soap_server',
                'prod_soap_server' => 'your_default_value_for_prod_soap_server',
                'created_at' => now(),
                'updated_at' => now(),

            ],

        ]);
    }
}
