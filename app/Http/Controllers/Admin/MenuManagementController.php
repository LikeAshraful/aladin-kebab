<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\ModifierGroup;
use App\Models\ModifierOption;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MenuManagementController extends Controller
{
    public function index(): Response
    {
        $categories = Category::with(['products.modifierGroups.options'])->orderBy('sort_order')->get();
        $modifierGroups = ModifierGroup::with('options')->orderBy('sort_order')->get();

        return Inertia::render('Admin/Menu/Index', [
            'categories' => $categories,
            'modifierGroups' => $modifierGroups,
        ]);
    }

    public function updateProduct(Request $request, Product $product): RedirectResponse
    {
        $validated = $request->validate([
            'base_price' => ['required', 'numeric', 'min:0'],
            'is_available' => ['required', 'boolean'],
            'badge' => ['nullable', 'string', 'max:50'],
            'spiciness_level' => ['required', 'integer', 'min:0', 'max:3'],
            'modifier_group_ids' => ['nullable', 'array'],
            'modifier_group_ids.*' => ['exists:modifier_groups,id'],
        ]);

        $product->update([
            'base_price' => $validated['base_price'],
            'is_available' => $validated['is_available'],
            'badge' => $validated['badge'],
            'spiciness_level' => $validated['spiciness_level'],
        ]);

        if (isset($validated['modifier_group_ids'])) {
            $product->modifierGroups()->sync($validated['modifier_group_ids']);
        }

        return back()->with('success', 'Produkt został zaktualizowany.');
    }

    public function updateModifierOption(Request $request, ModifierOption $option): RedirectResponse
    {
        $validated = $request->validate([
            'price_modifier' => ['required', 'numeric', 'min:0'],
            'is_available' => ['required', 'boolean'],
        ]);

        $option->update($validated);

        return back()->with('success', 'Opcja dodatku została zaktualizowana.');
    }
}
