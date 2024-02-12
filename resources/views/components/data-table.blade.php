@props([
    'footer_callback' => false,
    'dataTable' => [],
])

<div class="table-responsive">
    {{ $dataTable->table([], $footer_callback) }}
</div>

@push('lib-styles')
    <link rel="stylesheet" href="{{ nanopkg_asset('vendor/yajra-laravel-datatables/assets/datatables.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ nanopkg_asset('vendor/datatables/responsive.dataTables.min.css') }}">
@endpush
@push('css')
    <link rel="stylesheet" href="{{ nanopkg_asset('css/data-table.min.css') }}">
    <style>

    </style>
@endpush
@push('lib-scripts')
    <script src="{{ nanopkg_asset('vendor/yajra-laravel-datatables/assets/datatables.js') }}"></script>
    <script type="text/javascript" src="{{ nanopkg_asset('vendor/datatables/dataTables.responsive.min.js') }}"></script>
@endpush

@push('js')
    {{ $dataTable->scripts() }}
@endpush
