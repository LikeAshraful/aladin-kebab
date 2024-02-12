@props(['formContainer' => '400px'])
<div class="row h-100vh align-aitems-center">
    <div class="col-lg-7 d-flex align-aitems-center">
        <div class="form-wrapper p-0 m-auto">
            <div class="form-container my-4" style="min-width: {{ $formContainer }}">
                <div class="register-logo text-center mb-4">
                    <img style="max-width: 128px" src="{{ setting('site.logo_black', admin_asset('img/logo.png'), true) }}">
                </div>
                <div>
                    {{ $slot }}
                </div>
            </div>
        </div>
    </div>
    <div class="col-lg-5 login-bg d-none d-lg-block"
        style="background-image: url({{ setting('appearance.auth_img', admin_asset('img/login-bg.png'), true) }});">
        <div class="img-contant">
            <div class="top-notch">
                <img src="{{ admin_asset('img/thumbs-up.png') }}">
                <p class="mb-0">{{ setting('appearance.auth_quote_title') }}</p>
            </div>
            <p class="text-white">{{ setting('appearance.auth_quote') }}</p>
        </div>
    </div>
</div>
