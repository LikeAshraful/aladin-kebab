<?php

namespace Modules\Report\DataTables;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Modules\Booking\Entities\AirTicket;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;

class TicketReportDataTable extends DataTable
{
    /**
     * Get query source of dataTable.
     */
    public function query(AirTicket $model): QueryBuilder
    {
        $pnr = $this->request()->get('pnr');
        $ticket_number = $this->request()->get('ticket_number');
        $last_name = $this->request()->get('last_name');

        $query = $model->newQuery()
            ->with(['issued_user', 'pnr.travelers', 'pnr.legs', 'pnr.flights', 'pnr.baggages', 'details'])->fresh()->orderByDesc('id');

        $query->when($last_name, function ($query) use ($last_name) {
            $query->whereHas('pnr', function ($q) use ($last_name) {
                $q->whereHas('travelers', function ($q) use ($last_name) {
                    $q->where('surname', 'like', '%'.$last_name.'%');
                });
            });
        });

        $query->when($ticket_number, function ($q) use ($ticket_number) {
            $q->whereHas('details', function ($q) use ($ticket_number) {
                $q->where('ticket_number', 'like', '%'.$ticket_number.'%');
            });
        });

        if (! empty($pnr)) {
            $query->whereHas('pnr', function ($q) use ($pnr) {
                $q->where('gds_pnr', $pnr)
                    ->orWhere('airline_pnr', $pnr)
                    ->orWhere('fabricated_pnr', $pnr);
            });
        }

        $query->when($this->request->get('my_daterange'), function ($query) {
            $dateRange = explode('/', $this->request->get('my_daterange'));
            $startdate = $dateRange[0];
            $enddate = $dateRange[1];
            $query->whereDate('created_at', '>=', $startdate);
            $query->whereDate('created_at', '<=', $enddate);
        });

        return $query;
    }

    public function dataTable(QueryBuilder $query): EloquentDataTable
    {
        return (new EloquentDataTable($query))
            // ->addColumn('trip_type', function ($query) {
            //     return '';
            // })
            ->addColumn('last_name', function ($query) {
                return $query->pnr?->travelers->first()->surname;
            })
            ->addColumn('fabricated_pnr', function ($query) {
                return $query->pnr?->fabricated_pnr;
            })
            ->addColumn('gds_pnr', function ($query) {
                return $query->pnr?->gds_pnr;
            })
            ->addColumn('airline_pnr', function ($query) {
                return $query->pnr?->airline_pnr;
            })
            ->addColumn('supplier_pnr', function ($query) {
                return $query->pnr?->supplier_pnr;
            })
            ->addColumn('ticket_number', function ($query) {
                return implode(', ', array_column($query->details->toArray(), 'ticket_number'));
            })
            ->addColumn('pax', function ($query) {
                return $query->pnr?->total_passengers;
            })
            ->addColumn('departure', function ($query) {
                return $query->pnr?->legs->first()->first_airport;
            })
            ->addColumn('destination', function ($query) {
                return $query->pnr?->legs->last()->last_airport;
            })
            ->addColumn('departure_date', function ($query) {
                return Carbon::parse($query->pnr?->legs->first()->departure_date)->format('Y-m-d');
            })
            ->addColumn('arrival_date', function ($query) {
                return Carbon::parse($query->pnr?->legs->last()->arrival_date)->format('Y-m-d');
            })
            ->editColumn('created_at', function ($query) {
                return \Carbon\Carbon::parse($query->created_at)->format('M. j, Y, g:i a');
            })
            ->editColumn('created_user', function ($query) {
                return $query->issued_user?->name;
            })

            ->addIndexColumn();
    }

    /**
     * Optional method if you want to use html builder.
     */
    public function html(): HtmlBuilder
    {
        return $this->builder()
            ->setTableId('ticket-report-table')
            ->addTableClass('table-sm')
            ->columns($this->getColumns())
            ->responsive(true)
            // ->minifiedAjax()
            ->dom("<'row mb-3'<'col-md-4'l><'col-md-4 text-center'B><'col-md-4'f>>rt<'bottom'<'row'<'col-md-6'i><'col-md-6'p>>><'clear'>")
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
            Column::computed('DT_RowIndex')
                ->title(__('SL'))
                ->width(50)
                ->addClass('text-center dtr-control'),
            // Column::make('trip_type')
            //     ->title(__('Trip Type'))
            //     ->addClass('text-center'),
            Column::make('fabricated_pnr')
                ->title(__('System PNR'))
                ->addClass('text-center'),
            Column::make('gds_pnr')
                ->title(__('GDS PNR'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('airline_pnr')
                ->title(__('Airline PNR'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('supplier_pnr')
                ->title(__('Supplier PNR'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('last_name')
                ->title(__('Last Name'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('ticket_number')
                ->title(__('Ticket Number'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('pax')
                ->title(__('PAX'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('departure')
                ->title(__('Departure'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('destination')
                ->title(__('Destination'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('departure_date')
                ->title(__('Departure Date'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('arrival_date')
                ->title(__('Arrival Date'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('total_amount')
                ->title(__('Amount'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('created_at')
                ->title(__('Creation Date'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
            Column::make('created_user')
                ->title(__('User'))
                ->searchable(false)
                ->orderable(false)
                ->defaultContent('N/A')
                ->addClass('text-center'),
        ];
    }

    /**
     * Get filename for export.
     */
    protected function filename(): string
    {
        return 'ticket_report'.date('YmdHis');
    }
}
