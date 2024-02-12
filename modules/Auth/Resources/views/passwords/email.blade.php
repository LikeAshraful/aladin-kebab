<x-guest-layout class="login_container_wrapper">
    <div class="inner_content mx-auto">
        <div class="left_section w-100">
            <div class="">
                <div class="mb-3">
                    <img class="brand_logo" src="{{ setting('site.login_logo') ? image_url(setting('site.login_logo')) :  asset('img/subah-brand-logo.png') }}" alt="">
                    <h3 class="fs-24 fw-bold heading mt-2">{{ __('Forget you acccount password!') }}</h3>
                </div>
                @if (session('status'))
                <div class="alert alert-success" role="alert">
                    {{ session('status') }}
                </div>
                @endif

                <form class="register-form validate" method="POST" action="{{ route('password.email') }}">
                    @csrf
                    <div class="mb-3">
                        <input type="email" class="form-control input-py @error('email') is-invalid @enderror" id="email"
                            name="email" placeholder="Enter email" required autocomplete="email">
                        <span class="invalid-feedback text-start"></span>
                        @error('email')
                        <span class="invalid-feedback text-start" role="alert">
                            <strong>{{ __($message) }}</strong>
                        </span>
                        @enderror
                    </div>
                    <button type="submit" class="btn btn-success w-100">
                        {{ __('Send Password Reset Link') }}
                    </button>
                </form>

            </div>

        </div>
        <div class="right_section">
            <img src="{{ setting('site.login_img') ? image_url(setting('site.login_img')) :  asset('img/world-travel-tours.png') }}" alt="Login image">
        </div>
    </div>

    @push('css')
    <link rel="stylesheet" href="{{ module_asset('css/auth/login.min.css') }}">
    @endpush
    @push('js')
    <script src="{{ admin_asset('js/custom.min.js') }}"></script>
    <script src="{{ module_asset('js/auth/login.min.js') }}"></script>
    @endpush
</x-guest-layout>
