    <x-admin.multi-nav>

        @if (module_active('report') && can('view_reports'))
            <x-slot name="title">
                <i class="typcn typcn-chart-bar-outline"></i> {{ __('Reports') }}
            </x-slot>

            {{-- <x-admin.nav-link href="{{ route('admin.dashboard') }}">
                {{ __('Dashboard') }}
            </x-admin.nav-link> --}}

            <x-admin.nav-link href="{{ route('report.pnr') }}">
                {{ __('PNR Report') }}
            </x-admin.nav-link>

            <x-admin.nav-link href="{{ route('report.cancel-pnr') }}">
                {{ __('PNR Cancellation Report') }}
            </x-admin.nav-link>

            <x-admin.nav-link href="{{ route('report.ticket') }}">
                {{ __('Ticket Report') }}
            </x-admin.nav-link>

            <x-admin.nav-link href="{{ route('report.cancel-ticket') }}">
                {{ __('Ticket Cancellation Report') }}
            </x-admin.nav-link>

            <x-admin.nav-link href="{{ route('report.transaction-summery') }}">
                {{ __('Transaction Summery') }}
            </x-admin.nav-link>
        @endif


    </x-admin.multi-nav>
