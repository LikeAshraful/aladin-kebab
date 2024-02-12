<?php

namespace Modules\Setting\DataTables;

use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Modules\Setting\Entities\AppSettingBank;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;

class BankDataTable extends DataTable
{
    /**
     * Build DataTable class.
     *
     * @param  QueryBuilder  $query Results from query() method.
     */
    public function dataTable(QueryBuilder $query): EloquentDataTable
    {
        return (new EloquentDataTable($query))
            ->addColumn('action', function ($query) {
                $deleteRoute = route(config('theme.rprefix').'update', $query->id);
                $btn_txt = $query->is_active ? 'Make Inactive' : 'Make Active';

                return '<a href="#" onclick="onDelete(this)" data-route="'.$deleteRoute.'"  class="btn btn-success">'.$btn_txt.'</a>';
            })

            ->editColumn('is_active', function ($query) {
                if ($query->is_active == 1) {
                    return '<button type="button" class="btn btn-success">Active</button>';
                } else {
                    return '<button type="button" class="btn btn-danger">Inactive</button>';
                }
            })

            ->setRowId('id')
            ->addIndexColumn()
            ->rawColumns(['is_active', 'action']);
    }

    /**
     * Get query source of dataTable.
     */
    public function query(AppSettingBank $model): QueryBuilder
    {
        return $model->newQuery();
    }

    /**
     * Optional method if you want to use html builder.
     */
    public function html(): HtmlBuilder
    {
        return $this->builder()
            ->setTableId('bank-table')
            ->columns($this->getColumns())
            // ->minifiedAjax()
            ->dom("<'row mb-3'<'col-md-4'l><'col-md-4 text-center'B><'col-md-4'f>>rt<'bottom'<'row'<'col-md-6'i><'col-md-6'p>>><'clear'>")
            ->orderBy(3)
            // ->selectStyleSingle()
            ->buttons([
                Button::make('excel')->className('btn btn-success box-shadow--4dp btn-sm-menu'),
                Button::make('csv')->className('btn btn-success box-shadow--4dp btn-sm-menu'),
                Button::make('pdf')->className('btn btn-success box-shadow--4dp btn-sm-menu'),
                Button::make('print')->className('btn btn-success box-shadow--4dp btn-sm-menu'),
                Button::make('reset')->className('btn btn-success box-shadow--4dp btn-sm-menu'),
                Button::make('reload')->className('btn btn-success box-shadow--4dp btn-sm-menu'),
            ]);
    }

    /**
     * Get the dataTable columns definition.
     */
    public function getColumns(): array
    {

        return [
            Column::make('DT_RowIndex')->title(__('SI'))->searchable(false)->orderable(false)->width(30)->addClass('text-center'),

            Column::make('name')
                ->title(__('Name'))
                ->addClass('text-center')
                ->defaultContent('N/A'),

            Column::make('description')
                ->title(__('Description'))
                ->addClass('text-center')
                ->defaultContent('N/A'),

            Column::make('is_active')
                ->title(__('Status'))
                ->addClass('text-center')
                ->defaultContent('N/A'),

            Column::computed('action')
                ->title(__('Action'))
                ->searchable(false)
                ->exportable(false)
                ->printable(false)
                ->width(180)
                ->addClass('text-center'),
        ];
    }

    /**
     * Get filename for export.
     */
    protected function filename(): string
    {
        return 'banks_'.date('YmdHis');
    }
}
