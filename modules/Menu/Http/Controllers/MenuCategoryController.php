<?php

namespace Modules\Menu\Http\Controllers;

use Illuminate\Contracts\Support\Renderable;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Modules\Menu\DataTables\MenuCategoryDataTable;

class MenuCategoryController extends Controller {

    /**
     * Constructor for the controller.
     *
     * @return void
     */
    public function __construct() {
        \cs_set('theme', [
            'title'       => 'Category List',
            'description' => 'Displaying all categories.',
            'back'        => \back_url(),
            'breadcrumb'  => [
                [
                    'name' => 'Menu',
                    // 'link' => route('admin.dashboard'),
                ],
                [
                    'name' => 'Category List',
                    'link' => false,
                ],
            ],
            'rprefix'     => 'admin.menu.category',
        ]);
    }

    /**
     * Display a listing of the resource.
     * @return Renderable
     */
    public function index(MenuCategoryDataTable $dataTable) {
        return $dataTable->render('menu::category.index');
    }

    /**
     * Show the form for creating a new resource.
     * @return Renderable
     */
    public function create() {
        return view('menu::create');
    }

    /**
     * Store a newly created resource in storage.
     * @param Request $request
     * @return Renderable
     */
    public function store(Request $request) {
        //
    }

    /**
     * Show the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function show($id) {
        return view('menu::show');
    }

    /**
     * Show the form for editing the specified resource.
     * @param int $id
     * @return Renderable
     */
    public function edit($id) {
        return view('menu::edit');
    }

    /**
     * Update the specified resource in storage.
     * @param Request $request
     * @param int $id
     * @return Renderable
     */
    public function update(Request $request, $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @param int $id
     * @return Renderable
     */
    public function destroy($id) {
        //
    }
}
