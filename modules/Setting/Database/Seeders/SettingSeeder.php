<?php

namespace Modules\Setting\Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\Setting\Entities\Setting;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        json_seed(new Setting, __DIR__.'/data.json');
        $this->call(CountriesTableSeeder::class);
        $this->call(GdsTableSeeder::class);
        $this->call(ExcludeAirlineSeederTableSeeder::class);
        $this->call(SotoAirlinesTableSeeder::class);
        $this->call(BankTableSeeder::class);
        $this->call(BankBranchTableSeeder::class);
        $this->call(AgentPolicyTableSeeder::class);
    }

    /**
     * [setting description].
     *
     * @param [type] $key [description]
     * @return [type] [description]
     */
    protected function findSetting($key)
    {
        return Setting::firstOrNew(['key' => $key]);
    }
}
