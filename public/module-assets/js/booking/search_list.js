const book_now_submit = (id, revalidate_url, pnr_url) => {
    loader.display();

    let itinary_index = $(`#${id}`).data('itinerary-index');
    let flight = $(`#${id}`).data('flight').replace("\\", "");

    $.ajax({
        url: revalidate_url,
        method: 'post',
        data: {
            payload: flight,
            itinary_index,
        },
        success: function (data) {
            let url = pnr_url;
            let new_url = url.replace(':id', data.unique_id);
            new_url = new_url + '?changed=' + data.changed;
            if (data.unique_id == undefined) {

                $('.page-loader-wrapper').hide();
                $('.layer').removeClass('layer-is-visible');
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Flight is not available for this time",
                });

                return;
            }
            window.location.href = new_url;
        },
        error: function (data) {
            loader.hide()
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong with this flight",
            });
        },
    });
}

function searchNextDepartureDate(dayCount,route, rquestData) {

    rquestData = JSON.parse(rquestData);
    var currentStartDate = new Date(rquestData['t-start'].split('-').reverse().join('-'));
    currentStartDate.setDate(currentStartDate.getDate() + dayCount);
    rquestData['t-start'] = formatDate(currentStartDate);
    rquestData['_token'] = rquestData['_token'];


    var form = $('<form>', {
        id: 'searchForm',
        action: route,
        method: 'POST'
    });

    for (var key in rquestData) {
        if (rquestData.hasOwnProperty(key)) {
            form.append($('<input>', {
                type: 'hidden',
                name: key,
                value: rquestData[key]
            }));
        }
    }

    $('body').append(form);
    loader.display();
    form.submit();

}

function formatDate(date) {
    var day = ('0' + date.getDate()).slice(-2);
    var month = ('0' + (date.getMonth() + 1)).slice(-2);
    var year = date.getFullYear();
    return day + '-' + month + '-' + year;
}

function bookButtonClickHandler() {
    $('#home-tab').click()
}


