<select {{ $attributes->merge(['class'=>'form-control select2']) }}>
    {{ $slot }}</select>

@push('lib-styles')
    <link href="{{ nanopkg_asset('vendor/select2/select2.min.css') }}" rel="stylesheet" type="text/css" />
    <link href="{{ admin_asset('css/select2.css') }}" rel="stylesheet" type="text/css" />

@endpush
@push('js')
<!-- Select 2-->
    <script src="{{ nanopkg_asset('vendor/select2/select2.min.js') }}"></script>
    <script src="{{ admin_asset('js/select2.js') }}"></script>
@endpush
