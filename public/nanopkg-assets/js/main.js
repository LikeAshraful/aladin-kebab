// init tooltip
$(document).ready(function () {
    ("use strict"); // Start of use strict

    // init tooltip
    $("[data-bs-toggle=tooltip]").tooltip();
});

/**
 * Show axios errors to toastr
 * @param {*} error
 */
function showAxiosErrors(error) {
    if (
        typeof error.response !== "undefined" &&
        typeof error.response.data !== "undefined" &&
        typeof error.response.data.message !== "undefined"
    ) {
        toastr.error(error.response.data.message);
    } else if (
        typeof error.response !== "undefined" &&
        typeof error.response.data !== "undefined" &&
        typeof error.response.data.errors !== "undefined" &&
        typeof error.response.data.errors.message !== "undefined"
    ) {
        toastr.error(error.response.data.errors.message);
    } else {
        toastr.error("Something went wrong");
    }
    if (
        typeof error.response !== "undefined" &&
        typeof error.response.data !== "undefined" &&
        typeof error.response.data.data !== "undefined" &&
        typeof error.response.data.data !== "undefined"
    ) {
        toastr.error(error.response.data.data);
    }
}

function copySummernoteContentToClipboard(editorId, type = "text") {
    // Get the HTML content of the Summernote editor
    var content = $(editorId)
        .summernote("code")
        .replace(/<\/?[^>]+(>|$)/g, "");
    console.log(content);
    // Create a new textarea element to copy the content to clipboard
    var $temp = $("<textarea>");
    $("body").append($temp);

    // Set the textarea value to the HTML content
    $temp.val(content).select();

    // Copy the content to clipboard using the Clipboard API
    navigator.clipboard
        .writeText(content)
        .then(function () {
            console.log("Content copied to clipboard");
        })
        .catch(function (error) {
            console.error("Failed to copy content: ", error);
        })
        .finally(function () {
            // Remove the temporary textarea element
            $temp.remove();
        });
}


$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': "{{ csrf_token() }}"
    }
});

$(function() {
    // Search filter
    let table = $('body').find('table').first();
    $('.search-btn').click(function() {
        let params = {};
        $(".my-filter-form").find("select, textarea, input").each(function(index, item) {
            params[item.name] = item.value;
        });

        table.on('preXhr.dt', function(e, settings, data) {
            for (const [key, value] of Object.entries(params)) {
                data[key] = value;
            }

        });
        table.DataTable().ajax.reload();
    });

    $('.reset-btn').click(function() {

        $(".my-filter-form").find("textarea, input").val('');
        $(".my-filter-form").find("select").val('').trigger('change');
        let params = {};
        $(".my-filter-form").find("select, textarea, input").each(function(index, item) {
            params[item.name] = item.value;
        });
        table.on('preXhr.dt', function(e, settings, data) {
            for (const [key, value] of Object.entries(params)) {
                data[key] = value;
            }
        });
        $('#flush-collapseOne').collapse('hide');
        table.DataTable().ajax.reload();
    });



});



$(document).ready(function() {
    "use strict"; // Start of use strict
    var start = moment().subtract(29, 'days');
    var end = moment();
    $('.my_daterange').daterangepicker({

        startDate: start,
        endDate: end,

        locale: {
            separator: ' / ',
            format: 'YYYY-MM-DD'
        },
        ranges: {
            'Today': [moment(), moment()],
            'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
            'Last 7 Days': [moment().subtract(6, 'days'), moment()],
            'Last 30 Days': [moment().subtract(29, 'days'), moment()],
            'This Month': [moment().startOf('month'), moment().endOf('month')],
            'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1,
                'month').endOf('month')]
        }

    });


    $('.my_daterange').val('');

});

function printContent(el) {
    var restorepage = document.body.innerHTML;
    var printcontent = document.getElementById(el).innerHTML;
    document.body.innerHTML = printcontent;
    window.print();
    document.body.innerHTML = restorepage;
}

