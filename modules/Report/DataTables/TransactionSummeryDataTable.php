<?php

namespace Modules\Report\DataTables;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder as QueryBuilder;
use Modules\Booking\Entities\GdsPnr;
use Yajra\DataTables\EloquentDataTable;
use Yajra\DataTables\Html\Builder as HtmlBuilder;
use Yajra\DataTables\Html\Button;
use Yajra\DataTables\Html\Column;
use Yajra\DataTables\Services\DataTable;

class TransactionSummeryDataTable extends DataTable
{
    /**
     * Get query source of dataTable.
     */
    public function query(GdsPnr $model): QueryBuilder
    {
        $pnr = $this->request()->get('pnr');
        $last_name = $this->request()->get('last_name');
        $ticket_number = $this->request()->get('ticket_number');

        $query = $model->newQuery()
            ->with(['user', 'travelers', 'legs', 'flights', 'baggages', 'ticket'])
            ->where('is_cancel', false)
            ->where('is_ticket_cancel', false);

        $query->when($last_name, function ($query) use ($last_name) {
            $query->whereHas('travelers', function ($q) use ($last_name) {
                $q->where('surname', 'like', '%'.$last_name.'%');
            });
        });

        $query->when($ticket_number, function ($query) use ($ticket_number) {
            $query->whereHas('ticket', function ($q) use ($ticket_number) {
                $q->whereHas('details', function ($q) use ($ticket_number) {
                    $q->where('ticket_number', 'like', '%'.$ticket_number.'%');
                });
            });
        });

        $query->when($this->request()->get('issue_type'), function ($query) {

            if ($this->request()->get('issue_type') == 1) {
                $issue_type = false;
            } elseif ($this->request()->get('issue_type') == 2) {
                $issue_type = true;
            }

            $query->where('is_ticketed', $issue_type);
        });

        if (! empty($pnr)) {
            $query->where('gds_pnr', $pnr);
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
            ->addColumn('issue_type', function ($query) {
                return $query->is_ticketed ? 'Issue' : 'Booking';
            })
            ->addColumn('ticket_number', function ($query) {
                if ($query?->ticket?->details) {
                    return implode(', ', array_column($query?->ticket?->details->toArray(), 'ticket_number'));
                } else {
                    return '';
                }
            })
            ->addColumn('last_name', function ($query) {
                return $query->travelers->first()->surname;
            })
            ->addColumn('departure', function ($query) {
                return $query->legs->first()->first_airport;
            })
            ->addColumn('destination', function ($query) {
                return $query->legs->last()->last_airport;
            })
            ->addColumn('departure_date', function ($query) {
                return Carbon::parse($query->legs->first()->departure_date)->format('Y-m-d');
            })
            ->addColumn('arrival_date', function ($query) {
                return Carbon::parse($query->legs->last()->arrival_date)->format('Y-m-d');
            })

            ->addIndexColumn();
    }

    /**
     * Optional method if you want to use html builder.
     */
    public function html(): HtmlBuilder
    {
        return $this->builder()
            ->setTableId('transaction-summery')
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
            Column::make('issue_type')
                ->title(__('Issue Type'))
                ->addClass('text-center'),
            Column::make('gds_pnr')
                ->title(__('GDS PNR'))
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

        ];
    }

    /**
     * Get filename for export.
     */
    protected function filename(): string
    {
        return 'transaction_summery'.date('YmdHis');
    }
}
