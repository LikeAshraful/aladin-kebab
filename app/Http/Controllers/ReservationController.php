<?php

namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\Reservation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReservationController extends Controller
{
    public function create(Request $request): Response
    {
        $branches = Branch::where('is_active', true)->get();
        $selectedBranchId = $request->query('branch_id', $request->session()->get('selected_branch_id'));
        $selectedBranch = $branches->firstWhere('id', $selectedBranchId) ?? $branches->first();

        return Inertia::render('Reservations/Create', [
            'branches' => $branches,
            'selectedBranch' => $selectedBranch,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'branch_id' => ['required', 'exists:branches,id'],
            'customer_name' => ['required', 'string', 'max:255'],
            'customer_phone' => ['required', 'string', 'max:30'],
            'customer_email' => ['nullable', 'email', 'max:255'],
            'guests_count' => ['required', 'integer', 'min:1', 'max:50'],
            'reservation_date' => ['required', 'date', 'after_or_equal:today'],
            'reservation_time' => ['required', 'date_format:H:i'],
            'seating_preference' => ['required', 'string', 'in:indoor,outdoor,terrace,quiet_corner'],
            'notes' => ['nullable', 'string', 'max:500'],
        ]);

        $code = Reservation::generateCode();

        $reservation = Reservation::create([
            'reservation_code' => $code,
            'branch_id' => $validated['branch_id'],
            'user_id' => $request->user()?->id,
            'customer_name' => $validated['customer_name'],
            'customer_phone' => $validated['customer_phone'],
            'customer_email' => $validated['customer_email'],
            'guests_count' => $validated['guests_count'],
            'reservation_date' => $validated['reservation_date'],
            'reservation_time' => $validated['reservation_time'],
            'seating_preference' => $validated['seating_preference'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
        ]);

        return redirect()->route('reservations.show', ['code' => $reservation->reservation_code])
            ->with('success', 'Rezerwacja została pomyślnie wysłana! Oczekuj na potwierdzenie.');
    }

    public function show(string $code): Response
    {
        $reservation = Reservation::with('branch')->where('reservation_code', $code)->firstOrFail();

        return Inertia::render('Reservations/Show', [
            'reservation' => $reservation,
        ]);
    }

    public function myReservations(Request $request): Response
    {
        $user = $request->user();
        $reservations = Reservation::with('branch')
            ->where('user_id', $user->id)
            ->orderBy('reservation_date', 'desc')
            ->orderBy('reservation_time', 'desc')
            ->paginate(15);

        return Inertia::render('Reservations/MyReservations', [
            'reservations' => $reservations,
        ]);
    }
}
