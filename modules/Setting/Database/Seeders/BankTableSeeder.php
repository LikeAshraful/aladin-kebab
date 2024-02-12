<?php

namespace Modules\Setting\Database\Seeders;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Modules\Setting\Entities\AppSettingBank;

class BankTableSeeder extends Seeder
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

        AppSettingBank::insert([
            [
                'name' => 'City Bank Limited',
                'description' => 'Paltan VIP Road Branch',
                'create_by_id' => 1,
                'update_by_id' => 1,
                'created_at' => now()->format('Y-m-d H:i:s'),
                'updated_at' => now()->format('Y-m-d H:i:s'),
            ],
            [
                'name' => 'SCB',
                'description' => 'motijeel',
                'create_by_id' => 1,
                'update_by_id' => 1,
                'created_at' => now()->format('Y-m-d H:i:s'),
                'updated_at' => now()->format('Y-m-d H:i:s'),
            ],

        ]);
    }
}
