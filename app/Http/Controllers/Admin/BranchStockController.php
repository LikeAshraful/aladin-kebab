<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\BranchProductAvailability;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BranchStockController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $isSuperAdmin = $user->hasRole('super-admin');

        $branches = Branch::all();

        $selectedBranchId = null;
        if (! $isSuperAdmin && $user->branch_id) {
            $selectedBranchId = $user->branch_id;
        } elseif ($request->filled('branch_id')) {
            $selectedBranchId = (int) $request->query('branch_id');
        } else {
            $selectedBranchId = $branches->first()?->id;
        }

        $branch = Branch::with(['productAvailabilities'])->findOrFail($selectedBranchId);

        $categories = Category::with(['products.branchAvailabilities'])->get();

        return Inertia::render('Admin/Branches/Stock', [
            'branches' => $branches,
            'selectedBranch' => $branch,
            'categories' => $categories,
            'isSuperAdmin' => $isSuperAdmin,
        ]);
    }

    public function toggleProduct(Request $request, Branch $branch): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'is_in_stock' => ['required', 'boolean'],
        ]);

        $availability = BranchProductAvailability::updateOrCreate(
            [
                'branch_id' => $branch->id,
                'product_id' => $validated['product_id'],
            ],
            [
                'is_in_stock' => $validated['is_in_stock'],
            ]
        );

        return response()->json([
            'success' => true,
            'availability' => $availability,
        ]);
    }

    public function updateSettings(Request $request, Branch $branch): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'address' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'delivery_radius_km' => ['required', 'numeric', 'min:1'],
            'min_order_amount' => ['required', 'numeric', 'min:0'],
            'delivery_fee' => ['required', 'numeric', 'min:0'],
            'free_delivery_threshold' => ['nullable', 'numeric', 'min:0'],
            'is_active' => ['required', 'boolean'],
            'opening_hours' => ['nullable', 'array'],
        ]);

        $branch->update($validated);

        return back()->with('success', 'Ustawienia filii zostały zaktualizowane.');
    }
}
