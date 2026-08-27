<?php

namespace App\Http\Middleware;

use App\Models\Branch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $userData = null;

        if ($user) {
            $user->loadMissing(['roles', 'branch']);
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'phone' => $user->phone,
                'branch_id' => $user->branch_id,
                'branch' => $user->branch,
                'preferred_language' => $user->preferred_language,
                'roles' => $user->roles->pluck('name'),
                'is_super_admin' => $user->hasRole('super-admin'),
                'is_branch_manager' => $user->hasRole('branch-manager'),
                'is_kitchen_staff' => $user->hasRole('kitchen-staff'),
                'is_staff' => $user->hasAnyRole(['super-admin', 'branch-manager', 'kitchen-staff']),
            ];
        }

        $branches = [];
        try {
            if (Schema::hasTable('branches')) {
                $branches = Branch::where('is_active', true)->get();
            }
        } catch (\Throwable $e) {
            $branches = [];
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $userData,
            ],
            'branches' => $branches,
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
                'info' => fn () => $request->session()->get('info'),
            ],
            'locale' => fn () => $request->session()->get('locale', 'pl'),
        ];
    }
}
