<!doctype html>
<html lang="en">

<head>
    {{-- meta manager --}}
    <x-meta-manager />
    {{-- favicon --}}
    <x-favicon />
    {{-- style --}}
    <x-admin.styles />
</head>

<body {{ $attributes->merge(['class' => 'fixed sidebar-mini']) }} data-app-config="{{ $config??'' }}">
    <!-- Preloader -->
    <x-admin.preloader />
    <!-- vue page -->
    <div x-data="{ m: false }" >
        <!-- Begin page -->
        <div class="wrapper">
            <!-- start header -->
            <x-admin.left-sidebar />
            <!-- end header -->
            <div class="content-wrapper">
                <div class="main-content">
                    <x-admin.header />
                    <!--Content Header (Page header)-->
                    <div class="content-header row align-items-center g-0 p-0">

                        <div class="col-sm-8 header-title">
                            <div class="d-flex align-items-center">
                                @if (config('theme.icon'))
                                    <div
                                        class="header-icon d-flex align-items-center justify-content-center rounded shadow-sm text-success flex-shrink-0">
                                        {{ config('theme.icon') }}
                                    </div>
                                @endif
                                <div class="">
                                    {{ $tile ?? '' }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="body-content">
                        {{ $slot }}
                    </div>
                </div>
                <div class="overlay"></div>
                <x-admin.footer />
            </div>
        </div>
        <!--end  vue page -->
    </div>
    <!-- END layout-wrapper -->

    @stack('modal')
    <x-modal id="delete-modal" :title="__('Delete Modal')">
        <form action="javascript:void(0);" class="needs-validation" id="delete-modal-form">
            <div class="modal-body">
                <p>{{ __("Are you sure you want to delete this item? You won't be able to revert this item back!") }}
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" data-bs-dismiss="modal">{{ __('Close') }}</button>
                <button class="btn btn-danger" type="submit" id="delete_submit">{{ __('Delete') }}</button>
            </div>
        </form>
    </x-modal>

    <!-- start scripts -->
    <x-admin.scripts />
    <!-- end scripts -->
    <x-toster-session />


</body>

</html>
