<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Services\RoutingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BranchController extends Controller
{
    public function __construct(protected RoutingService $routingService) {}

    public function index(): JsonResponse
    {
        $branches = Branch::where('is_active', true)->get();

        return response()->json($branches);
    }

    public function nearest(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'lat' => ['required', 'numeric'],
            'lng' => ['required', 'numeric'],
        ]);

        $result = $this->routingService->findNearestBranch(
            (float) $validated['lat'],
            (float) $validated['lng']
        );

        if (! $result) {
            return response()->json(['error' => 'No active branches found'], 404);
        }

        return response()->json($result);
    }

    public function select(Request $request, Branch $branch)
    {
        $request->session()->put('selected_branch_id', $branch->id);

        return back()->with('success', "Wybrano lokal: {$branch->name}");
    }
}
