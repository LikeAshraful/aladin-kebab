<?php

use App\Http\Controllers\Admin\BranchStockController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\KitchenDisplayController;
use App\Http\Controllers\Admin\MenuManagementController;
use App\Http\Controllers\Admin\OrderManagementController;
use App\Http\Controllers\Admin\ReservationManagementController;
use App\Http\Controllers\BranchController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use Illuminate\Support\Facades\Route;

// Public Customer Routes
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::post('/locale/{locale}', [HomeController::class, 'setLocale'])->name('locale.set');
Route::post('/branches/{branch}/select', [BranchController::class, 'select'])->name('branches.select');
Route::post('/api/branches/nearest', [BranchController::class, 'nearest'])->name('branches.nearest');

// Order Lifecycle
Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');
Route::get('/orders/{order}', [OrderController::class, 'show'])->name('orders.show');
Route::post('/orders/{order}/pay', [OrderController::class, 'pay'])->name('orders.pay');

// Table Booking
Route::get('/reservations/book', [ReservationController::class, 'create'])->name('reservations.create');
Route::post('/reservations', [ReservationController::class, 'store'])->name('reservations.store');
Route::get('/reservations/{code}', [ReservationController::class, 'show'])->name('reservations.show');

// Authenticated Customer Area
Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        $user = request()->user();
        if ($user && $user->hasAnyRole(['super-admin', 'branch-manager', 'kitchen-staff'])) {
            return redirect()->route('admin.dashboard');
        }

        return redirect()->route('home');
    })->name('dashboard');

    Route::get('/my-orders', [OrderController::class, 'myOrders'])->name('orders.my');
    Route::get('/my-reservations', [ReservationController::class, 'myReservations'])->name('reservations.my');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Admin & Staff Operations
    Route::prefix('admin')->name('admin.')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

        // Orders
        Route::get('/orders', [OrderManagementController::class, 'index'])->name('orders.index');
        Route::patch('/orders/{order}/status', [OrderManagementController::class, 'updateStatus'])->name('orders.status');
        Route::get('/orders/{order}/receipt', [OrderManagementController::class, 'receipt'])->name('orders.receipt');

        // KDS (Kitchen Display System)
        Route::get('/kds', [KitchenDisplayController::class, 'index'])->name('kds.index');
        Route::get('/api/kds/orders', [KitchenDisplayController::class, 'fetchOrders'])->name('kds.fetch');
        Route::post('/api/kds/orders/{order}/advance', [KitchenDisplayController::class, 'advanceStatus'])->name('kds.advance');

        // Branch Stock & Settings
        Route::get('/branches/stock', [BranchStockController::class, 'index'])->name('branches.stock');
        Route::post('/branches/{branch}/toggle-product', [BranchStockController::class, 'toggleProduct'])->name('branches.toggle-product');
        Route::patch('/branches/{branch}', [BranchStockController::class, 'updateSettings'])->name('branches.update');

        // Table Reservations
        Route::get('/reservations', [ReservationManagementController::class, 'index'])->name('reservations.index');
        Route::patch('/reservations/{reservation}', [ReservationManagementController::class, 'update'])->name('reservations.update');

        // Menu Management
        Route::get('/menu', [MenuManagementController::class, 'index'])->name('menu.index');
        Route::patch('/menu/products/{product}', [MenuManagementController::class, 'updateProduct'])->name('menu.product.update');
        Route::patch('/menu/options/{option}', [MenuManagementController::class, 'updateModifierOption'])->name('menu.option.update');
    });
});

require __DIR__.'/auth.php';
