@props([
    'dateFilter' => '',
    'show' => false
])

<div @class(['row mb-3'])>
    <div class="col-12">
        <div class="accordion accordion-flush" id="accordionFlushExample">
            <div class="accordion-item">

                <div id="flush-collapseOne" @class(["accordion-collapse bg-white collapse",  'mt-5 pt-4' => $dateFilter, 'show' => $show]) aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample" style="">
                    {{-- <div class="card-header">
                        <h6 class="fs-17 fw-semi-bold mb-0">{{('Filter Option')}}</h6>
                    </div> --}}
                    {{-- <div class="card-body"> --}}
                        <div class='row pb-3 my-filter-form' >

                            {!! $slot !!}


                            <div class="col-md-2 d-flex align-items-center">
                                <button class="btn btn-success me-2 search-btn" type="button">@lang('Search')</button>
                                <button class="btn btn-danger me-2 reset-btn" type="button">{{__('Reset')}}</button>
                            </div>
                        </div>
                    {{-- </div> --}}
                </div>
            </div>
        </div>
    </div>
</div>
