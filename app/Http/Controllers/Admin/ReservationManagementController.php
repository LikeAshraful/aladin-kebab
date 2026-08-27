<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Branch;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationManagementController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();
        $isSuperAdmin = $user->hasRole('super-admin');

        $query = Reservation::with(['branch', 'user']);

        if (! $isSuperAdmin && $user->branch_id) {
            $query->where('branch_id', $user->branch_id);
        } elseif ($request->filled('branch_id') && $request->query('branch_id') !== 'all') {
            $query->where('branch_id', $request->query('branch_id'));
        }

        if ($request->filled('status') && $request->query('status') !== 'all') {
            $query->where('status', $request->query('status'));
        }

        if ($request->filled('date')) {
            $query->whereDate('reservation_date', $request->query('date'));
        }

        $reservations = $query->orderBy('reservation_date', 'asc')
            ->orderBy('reservation_time', 'asc')
            ->paginate(20)
            ->withQueryString();

        $branches = Branch::all();

        return Inertia::render('Admin/Reservations/Index', [
            'reservations' => $reservations,
            'branches' => $branches,
            'filters' => $request->only(['branch_id', 'status', 'date']),
            'isSuperAdmin' => $isSuperAdmin,
        ]);
    }

    public function update(Request $request, Reservation $reservation): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', 'in:pending,confirmed,completed,cancelled,no_show'],
            'table_assigned' => ['nullable', 'string', 'max:50'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $reservation->update($validated);

        return back()->with('success', "Rezerwacja {$reservation->reservation_code} została zaktualizowana.");
    }
}
