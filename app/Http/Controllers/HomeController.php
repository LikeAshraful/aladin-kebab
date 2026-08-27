<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $branches = Branch::where('is_active', true)->get();

        $selectedBranchId = $request->session()->get('selected_branch_id', $branches->first()?->id);
        $selectedBranch = $branches->firstWhere('id', $selectedBranchId) ?? $branches->first();

        $categories = Category::where('is_active', true)
            ->with(['products' => function ($query) {
                $query->where('is_available', true)
                    ->with(['modifierGroups.options' => function ($optQuery) {
                        $optQuery->where('is_available', true)->orderBy('sort_order');
                    }, 'branchAvailabilities'])
                    ->orderBy('sort_order');
            }])
            ->orderBy('sort_order')
            ->get();

        // Process products with branch availability flags
        $categories->each(function ($cat) use ($selectedBranch) {
            $cat->products->each(function ($prod) use ($selectedBranch) {
                $prod->is_in_stock_at_branch = $selectedBranch ? $prod->isAvailableAtBranch($selectedBranch->id) : true;
            });
        });

        return Inertia::render('Home', [
            'branches' => $branches,
            'selectedBranch' => $selectedBranch,
            'categories' => $categories,
        ]);
    }

    public function setLocale(Request $request, string $locale)
    {
        if (in_array($locale, ['pl', 'en'])) {
            $request->session()->put('locale', $locale);
            if ($request->user()) {
                $request->user()->update(['preferred_language' => $locale]);
            }
        }

        return back();
    }
}
