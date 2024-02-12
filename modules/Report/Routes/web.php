<?php

use Illuminate\Support\Facades\Route;
use Modules\Report\Http\Controllers\ReportController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('report')->as('report.')->controller(ReportController::class)->middleware(['auth'])->group(function () {
    Route::get('pnr', 'pnrReport')->name('pnr');
    Route::get('cancellation-pnr', 'pnrCancelReport')->name('cancel-pnr');
    Route::get('ticket', 'ticketReport')->name('ticket');
    Route::get('cancellation-ticket', 'ticketCancelReport')->name('cancel-ticket');
    Route::get('transaction-summery', 'transactionSummeryReport')->name('transaction-summery');
});
