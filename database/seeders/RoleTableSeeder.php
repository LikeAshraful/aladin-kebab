<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Modules\Permission\Entities\Permission;
use Modules\Role\Entities\Role;

class RoleTableSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
        $permissions = [
            'General'     => [],
            'User'        => [
                'user_management',
                'role_management',
                'permission_management',
            ],
            'Dashboard'   => [
                'overall_count_report',
            ],
            'Setting'     => [
                'setting_management',
                'mail_setting_management',
                'recaptcha_setting_management',
                'module_setting_management',
                'env_setting_management',
                'language_setting_management',
            ],
            'Backup'      => [
                'backup_management',
            ],

            'Transaction' => [
                'new_deposit',
                'send_money',
                'pending_transactions',
                'bank_statements',
            ],
            'Reports'     => [
                'view_reports',
            ],
        ];
        $roles = [
            'User' => [
                'view_reports',
            ],
        ];

        $administrator = Role::create(['name' => 'Administrator']);

        foreach ($permissions as $group => $groups) {

            foreach ($groups as $permission) {
                Permission::create([
                    'name'  => $permission,
                    'group' => $group,
                ])->assignRole($administrator);
            }

        }

        foreach ($roles as $role => $permissions) {
            $role = Role::create(['name' => $role]);
            $role->givePermissionTo($permissions);
        }

        $users = [
            [
                'name'              => 'Admin',
                'email'             => 'admin@gmail.com',
                'password'          => Hash::make('admin'),
                'email_verified_at' => now(),
                'status'            => 'Active',

            ], [
                'name'              => 'User',
                'email'             => 'user@gmail.com',
                'password'          => Hash::make('user'),
                'email_verified_at' => now(),
                'status'            => 'Active',
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }

        User::find(1)->assignRole('Administrator');
        User::find(2)->assignRole('User');
    }

}
