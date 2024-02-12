jQuery(function() {

    let app_config = $('[data-app-config]').data('app-config');
    $('.select2').select2({
        app_config
    });
});
