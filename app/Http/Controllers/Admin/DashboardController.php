<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Services\AnalyticsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __construct(protected AnalyticsService $analyticsService) {}

    public function index(Request $request): Response
    {
        $user = $request->user();
        $isSuperAdmin = $user->hasRole('super-admin');

        // If user is a branch manager or kitchen staff, lock to their branch
        $branchId = null;
        if (! $isSuperAdmin && $user->branch_id) {
            $branchId = $user->branch_id;
        } elseif ($request->has('branch_id') && $request->query('branch_id') !== 'all') {
            $branchId = (int) $request->query('branch_id');
        }

        $metrics = $this->analyticsService->getMasterDashboardMetrics($branchId);
        $branches = Branch::all();

        return Inertia::render('Admin/Dashboard', [
            'metrics' => $metrics,
            'branches' => $branches,
            'selectedBranchId' => $branchId,
            'isSuperAdmin' => $isSuperAdmin,
        ]);
    }
}
