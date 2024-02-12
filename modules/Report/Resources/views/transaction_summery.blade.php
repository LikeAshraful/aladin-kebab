<x-app-layout>

    <x-card>

        <x-slot name='actions'>
            <h2 class="accordion-header d-flex justify-content-end" id="flush-headingOne">
                <button type="button" class="btn btn-success" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne"
                    aria-expanded="true" aria-controls="flush-collapseOne"> <i class="fas fa-filter"></i> @lang('Filter')</button>
                &nbsp;
            </h2>
        </x-slot>

        <x-filter-layout>

            <div class="col-md-2">
                <select class="form-control" name="issue_type" id="issue-type">
                    <option value="">{{ __('Select Issue Type') }}</option>
                    <option value="1">@lang('Booking')</option>
                    <option value="2">@lang('Issue')</option>
                </select>
            </div>

            <div class="col-md-2">
                <input class="form-control" type="text" placeholder="{{ __('PNR') }}" name="pnr"
                    id="pnr">
            </div>

            <div class="col-md-2">
                <input class="form-control" type="text" placeholder="{{ __('Ticket Number') }}" name="ticket_number"
                    id="ticket_number">
            </div>

            <div class="col-md-2">
                <input class="form-control" type="text" placeholder="{{ __('Last Name') }}" name="last_name"
                    id="last_name">
            </div>

            <div class="col-md-2">
                <input type="text" class="my_daterange form-control" placeholder="{{ __('Date Range') }}"
                    name="my_daterange" id="my_daterange">
            </div>

        </x-filter-layout>

        <div>
            <x-data-table :dataTable="$dataTable" />
        </div>
    </x-card>

</x-app-layout>
