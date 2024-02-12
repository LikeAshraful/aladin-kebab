<x-app-layout>

    @stack('lib-styles')

    @stack('css')

    <div class="row mb-3">
        <div class="col-sm-6 col-xl-3 mb-3">
            <div class="card overflow-hidden bg-1">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="text-white">
                            <h6 class="mb-2 fw-bold">@lang('Total Agents')</h6>
                            <h4 class="mb-2 fw-bold">{{ 0 }}</h4>
                        </div>
                        <div class="col-3 align-items-center d-flex">
                            <div class="counter-icon box-shadow-primary bg-white brround ms-auto"><i
                                    class="typcn typcn-user-outline"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3 mb-3">
            <div class="card overflow-hidden bg-2">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between ">
                        <div class="text-white">
                            <h6 class="mb-2 fw-bold">@lang('Total Clients')</h6>
                            <h4 class="mb-2 fw-bold">{{ 0 }}</h4>
                        </div>
                        <div class="col-3 align-items-center d-flex">
                            <div class="counter-icon box-shadow-primary bg-white brround ms-auto"><i
                                    class="typcn typcn-group-outline"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3 mb-3">
            <div class="card overflow-hidden bg-3">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="text-white">
                            <h6 class="mb-2 fw-bold">@lang('Total Amount')</h6>
                            <h4 class="mb-2 fw-bold">${{ 0 }}</h4>
                        </div>
                        <div class="col-3 align-items-center d-flex">
                            <div class="counter-icon box-shadow-primary bg-white brround ms-auto"><i
                                    class="typcn typcn-calculator"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-xl-3 mb-3">
            <div class="card overflow-hidden bg-4">
                <div class="card-body">
                    <div class="d-flex align-items-center justify-content-between">
                        <div class="text-white">
                            <h6 class="mb-2 fw-bold">@lang('Total Sales')</h6>
                            <h4 class="mb-2 fw-bold">{{ 0 }}</h4>
                        </div>
                        <div class="col-3 align-items-center d-flex">
                            <div class="counter-icon box-shadow-primary bg-white brround ms-auto"><i
                                    class="typcn typcn-bell"></i></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>




    @stack('lib-scripts')



    @stack('js')

</x-app-layout>
