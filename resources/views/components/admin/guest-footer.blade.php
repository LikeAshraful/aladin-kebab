<footer {{ $attributes->merge(['class'=>'']) }}>
    <div class="">
        <div class="copy">© {{ date('Y') }} <a class="text-capitalize" href="{{ __(setting('site.url')) }}" target="_blank">{{
                config('app.name')
                }}</a>.</div>
        <div class="credit">{{ __('Designed & Developed by') }}: <a href="{{ __(setting('site.url')) }}" target="_blank">{{
               __(setting('site.name')) }}<a></div>
    </div>
</footer>
