<?php

namespace Modules\Setting\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Setting\Entities\AppSettingBankBranch;

class BankBranchTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        AppSettingBankBranch::insert([
            [
                'branch_name' => 'Paltan/VIP Road',
                'bank_id' => 1,
                'address' => 'Paltan/VIP Road, 1223161708001',
                'city' => 'Dhaka',
                'country' => 'Bangladesh',
                'create_by_id' => 1,
                'update_by_id' => 1,
                'created_at' => now()->format('Y-m-d H:i:s'),
                'updated_at' => now()->format('Y-m-d H:i:s'),
            ],
            [
                'branch_name' => 'Vatara',
                'bank_id' => 2,
                'address' => 'Vatara, Dhaka',
                'city' => 'Dhaka',
                'country' => 'Bangladesh',
                'create_by_id' => 1,
                'update_by_id' => 1,
                'created_at' => now()->format('Y-m-d H:i:s'),
                'updated_at' => now()->format('Y-m-d H:i:s'),
            ],

        ]);
    }
}
