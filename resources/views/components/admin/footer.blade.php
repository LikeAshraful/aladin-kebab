<footer {{ $attributes->merge(['class'=>'footer-content']) }}>
    <div class="footer-text">
        <div class="row">
            <div class="col-md-6">
                <div class="copy">
                    © {{ date('Y') }} <a class="text-capitalize text-black" href="{{ setting('site.url') }}"
                        target="_blank">{{ __(setting('site.name')) }}</a>.
                </div>
            </div>
            <div class="col-md-6 text-end">
                <div class="credit">{{ __('Designed & Developed by') }}: <a class="text-black text-capitalize"
                        href="https://www.bdtask.com/" target="_blank">{{ __(setting('site.name')) }}<a>
                </div>
            </div>
        </div>
    </div>
</footer>
