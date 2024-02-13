<?php

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

use Illuminate\Support\Facades\Route;
use Modules\Menu\Http\Controllers\MenuCategoryController;

Route::prefix('admin/menu')->as('admin.menu.category.')->group(function () {
    Route::resource('/', MenuCategoryController::class)->except(['show'])->parameter('', 'category');
});
