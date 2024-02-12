<nav class="sidebar-nav card py-2 sub-side-bar p-2 py-3">
    <ul class=" nav">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-expanded="false">
                <i class="typcn typcn-adjust-brightness"></i>
                {{__('General Settings')}}
            </a>
            <ul class="dropdown-menu">
                @foreach (Modules\Setting\Facades\Setting::onlyGroup() as $group)
                <li class="{{ request()?->g==$group?'mm-active':null }}">
                    <a href="{{ route('admin.setting.index',['g'=>$group]) }}"
                        class="dropdown-item settings-goroup">{{__($group)}}</a>
                </li>
                @endforeach
            </ul>
        </li>
        {{-- <li class="nav-item {{ active_menu(route('admin.setting.create'),'mm-active') }} ">
            <a href="{{ route('admin.setting.create') }}">
                <i class="typcn typcn-document-add"></i>
                {{__('Create New Setting')}}
            </a>
        </li> --}}
        @if(can('mail_setting_management')&& Route::has('admin.setting.mail.index'))
        <li class="nav-item {{ active_menu(route('admin.setting.mail.index'),'mm-active') }} ">
            <a href="{{ route('admin.setting.mail.index') }}">
                <i class="typcn typcn-mail"></i>
                {{__('Mail Setting')}}
            </a>
        </li>
        @endif
        @if(can('recaptcha_setting_management')&& Route::has('admin.setting.recaptcha.index'))
        <li class="nav-item {{ active_menu(route('admin.setting.recaptcha.index'),'mm-active') }} ">
            <a href="{{ route('admin.setting.recaptcha.index') }}">
                <i class="typcn typcn-radar-outline"></i>
                {{__('Recaptcha Setting')}}
            </a>
        </li>
        @endif

        @if(can('env_setting_management')&& Route::has('admin.setting.env.index'))
        <li class="nav-item {{ active_menu(route('admin.setting.env.index'),'mm-active') }} ">
            <a href="{{ route('admin.setting.env.index') }}">
                <i class="typcn typcn-document-text"></i>
                {{__('.ENV Setting')}}
            </a>
        </li>
        @endif
        @if(can('language_setting_management')&& Route::has('admin.language.index'))
        <li class="nav-item {{ active_menu(route('admin.language.index'),'mm-active') }} ">
            <a href="{{ route('admin.language.index') }}">
                <i class="typcn typcn-sort-alphabetically"></i>
                {{__('Language')}}
            </a>
        </li>
        @endif
        {{-- @if (Route::has('artisan-http.storage-link'))
        <li class="nav-item {{ active_menu(route('artisan-http.storage-link'),'mm-active') }} ">
            <a href="javascript:void(0);" onclick="storageLink('{{ route('artisan-http.storage-link') }}')">
                <i class="typcn typcn-arrow-loop-outline"></i>
                {{__('Fix Storage Link')}}
            </a>
        </li>
        @endif --}}
    </ul>
</nav>