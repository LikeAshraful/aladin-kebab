<?php

namespace Modules\Report\Http\Controllers;

use Illuminate\Routing\Controller;
use Modules\Report\DataTables\PnrCancelReportDataTable;
use Modules\Report\DataTables\PnrReportDataTable;
use Modules\Report\DataTables\TicketCancelReportDataTable;
use Modules\Report\DataTables\TicketReportDataTable;
use Modules\Report\DataTables\TransactionSummeryDataTable;

class ReportController extends Controller
{
    public function __construct()
    {
        // $this->middleware(['auth', 'verified', 'permission:view_report']);
    }

    public function pnrReport(PnrReportDataTable $dataTable)
    {
        \cs_set('theme', [
            'title' => 'PNR Report',
            'description' => 'Passenger Name Record Report',
        ]);

        return $dataTable->render('report::pnr');
    }

    public function pnrCancelReport(PnrCancelReportDataTable $dataTable)
    {
        \cs_set('theme', [
            'title' => 'PNR Cancel Report',
            'description' => 'Canceled Passenger Name Record Report',
        ]);

        return $dataTable->render('report::pnr_cancel');
    }

    public function ticketReport(TicketReportDataTable $dataTable)
    {
        \cs_set('theme', [
            'title' => 'Ticket Report',
            'description' => 'Ticket Issue Report from PNR',
        ]);

        return $dataTable->render('report::ticket');
    }

    public function ticketCancelReport(TicketCancelReportDataTable $dataTable)
    {
        \cs_set('theme', [
            'title' => 'Ticket Cancel Report',
            'description' => 'Ticket Cancel Report',
        ]);

        return $dataTable->render('report::ticket_cancel');
    }

    public function transactionSummeryReport(TransactionSummeryDataTable $dataTable)
    {
        \cs_set('theme', [
            'title' => 'Transaction Summery',
            'description' => 'Transaction Summery',
        ]);

        return $dataTable->render('report::transaction_summery');
    }
}
