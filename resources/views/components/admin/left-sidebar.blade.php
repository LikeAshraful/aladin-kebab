<nav class="sidebar sidebar-bunker">
    <div class="sidebar-header" style="height: 67px;">
        <a href="{{ setting('site.url') }}" class="sidebar-brand">
            <img src="{{ setting('site.admin_logo', asset('img/subah-brand-logo.png'), true) }}" style="height: 67px;">
        </a>
    </div>

    <!--/.sidebar header-->
    <div class="profile-element d-block align-items-center flex-shrink-0">

        <div class="avatar online mb-2">
            <img src="{{ isset(auth()->user()->profile_photo_path) ? URL::to('storage') . '/' . auth()->user()->profile_photo_path : nanopkg_asset('image/blank.png') }}"
                class="img-fluid rounded-circle">
        </div>

        <div class="profile-text text-center">
            <h6 class="m-0">{{ auth()->user()?->name }}</h6>
            <span class="text-muted">
                <i class="typcn typcn-media-record text-success"></i>
                {{ implode(',', auth()->user()?->getRoleNames()?->toArray()) }}
            </span>
        </div>
    </div>


    <!--/.sidebar header-->
    <div class="sidebar-body">
        <nav class="sidebar-nav">

            <ul class="metismenu">

                <x-admin.multi-nav>

                    @if (module_active('menu') && can('permission_management'))
                        <x-slot name="title">
                            <i class="typcn typcn-lock-open-outline"></i> {{ __('Menu Management') }}
                        </x-slot>
                    @endif

                    @if (module_active('menu') && can('permission_management'))
                        <x-admin.nav-link href="{{ route('admin.menu.category.index') }}">
                            {{ __('Menu Category') }}
                        </x-admin.nav-link>
                    @endif



                </x-admin.multi-nav>


                @if (can('permission_management') ||
                        can('role_read') ||
                        can('user_management') ||
                        (module_active('setting') && can('setting_management')))
                @endif

                @include('layouts.partials.nav_report')

                <x-admin.multi-nav>

                    @if (module_active('setting') && (can('user_management') || can('role_management') || can('permission_management')))
                        <x-slot name="title">
                            <i class="typcn typcn-lock-open-outline"></i> {{ __('User Access Role') }}
                        </x-slot>
                    @endif

                    @if (module_active('permission') && can('permission_management'))
                        <x-admin.nav-link href="{{ route('admin.permission.index') }}">
                            {{ __('Permission') }}
                        </x-admin.nav-link>
                    @endif

                    @if (module_active('role') && can('role_management'))
                        <x-admin.nav-link href="{{ route('admin.role.index') }}">
                            {{ __('Role') }}
                        </x-admin.nav-link>
                    @endif

                    @if (module_active('user') && can('user_management'))
                        <x-admin.nav-link href="{{ route('admin.user.index') }}">
                            {{ __('User') }}
                        </x-admin.nav-link>
                    @endif

                </x-admin.multi-nav>


                <x-admin.multi-nav>

                    @if (module_active('setting') && can('setting_management'))
                        <x-slot name="title">
                            <i class="typcn typcn-cog-outline"></i> {{ __('Application Setting') }}
                        </x-slot>
                    @endif

                    @if (module_active('setting') && can('setting_management'))
                        <x-admin.nav-link href="{{ route('admin.setting.index', ['g' => 'Site']) }}">
                            {{ __('General Setting') }}
                        </x-admin.nav-link>
                    @endif

                </x-admin.multi-nav>

            </ul>
        </nav>
        <div class="mt-auto p-3">
            <x-logout>
                <span class="btn btn-primary w-100">
                    <img class="me-2" src="{{ admin_asset('img/logout.png') }}">
                    <span>{{ __('Logout') }}</span>
                </span>
            </x-logout>
        </div>
    </div>
</nav>
