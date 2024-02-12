(function () {
    const loader = {
        hide: function () {
            $('#loader').css({
                display: 'none'
            })
            $('#custom-overlay').css({
                display: 'none'
            })
            $('.page-loader-wrapper').hide();
        },
        display: function () {
            $('#loader').css({
                display: 'block'
            })
            $('#custom-overlay').css({
                display: 'block'
            })
            $('.page-loader-wrapper').show();
        }
    }
    window.loader = loader
})()

function showLoader(){
    loader.display()
}

document.addEventListener('submit', function (event) {
    var submittedForm = event.target;

    // Check if the form has the "on-submit" class
    if (submittedForm.classList.contains('on-submit')) {
        loader.display();
    }
});

