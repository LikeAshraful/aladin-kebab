// jQuery(function() {
//     ("use strict"); // Start of use strict

//     // Creativity Level select2 init
//     $("#edit-group").select2({
//         dropdownParent: $("#edit-modal"),
//         tags: true,
//     });
//     /**
//      * Creativity Level update form submit
//      */
//     $("#update-form").submit(function (e) {
//         e.preventDefault();
//         update($(this));
//     });
//     /**
//      * Creativity Level group select2 init
//      */
//     $("#create-creativity-level-group").select2({
//         dropdownParent: $("#create-creativity-level-modal"),
//         tags: true,
//     });
//     /**
//      * Creativity Level create form submit
//      */
//     $("#create-creativity-level-form").submit(function (e) {
//         e.preventDefault();
//         store($(this));
//     });

//     $('a.doc-download').click(function (e) {
//         e.preventDefault();
//         console.log('clicking for download');
//         console.log('doc-download');
//         let uri = $(this).data('url');
//         var link = document.createElement("a");
//         link.download = 'download';
//         link.href = uri;
//         link.click();
//     });

//     $('#reject-reason').submit(function (e) {
//         e.preventDefault();
//         console.log('reject-reason');
//         updateStatusWithReason($(this));
//     });
// });

// function downloadFile(url) {
//     var link = document.createElement("a");
//     link.download = 'download';
//     link.href = url;
//     link.click();
// }


// function showCreateModal() {
//     $("#create-modal").modal("show");
// }

// function showEditModal(id) {
//     axios
//         .get($("#page-axios-data").data("edit"), {
//             params: {
//                 id: id,
//             },
//         })
//         .then((res) => {

//             console.log(res.data.data);
//             $("#update_name").val(res.data.data.name);
//             $("#update_icon_path_img").attr(
//                 "src",
//                 res.data.data.icon
//             );

//             if (res.data.data.is_active == 1) {
//                 $("#update_is_active").prop("checked", true);
//             }


//             $("#update_id").val(res.data.data.id);

//             $("#client_id").val(res.data.data.client_id);
//             $("#client_secret").val(res.data.data.client_secret);
//             $("#username").val(res.data.data.username);
//             $("#password").val(res.data.data.password);


//             $("#payment_amount").val(res.data.data.payment_amount);
//             $("#second_pay_amount").val(res.data.data.second_pay_amount);
//             $("#rating_range").val(res.data.data.rating_range).trigger("change");

//             // $("#update_id").val(res.data.data.id);

//             $("#update_agent_category_id").val(res.data.data.agent_category_id).trigger("change");
//             $("#edit-modal").modal("show");
//         })
//         .catch((err) => {
//             showAxiosErrors(err);
//         });
// }


// /**
//  * Store data
//  * @param form
//  */
// function store(form) {
//     // get form data with image and files
//     var data = new FormData(form[0]);
//     axios
//         .post($("#page-axios-data").data("create"), data)
//         .then(function (response) {
//             toastr.success(response.data.message, "Success");
//             $("#create-modal").modal("hide");
//             form.trigger("reset");
//             $("#icon_path_img").attr("src", "");
//             $($("#page-axios-data").data("table-id"))
//                 .DataTable()
//                 .ajax.reload(null, false);
//         })
//         .catch((err) => {
//             showAxiosErrors(err);
//         });
// }

// function updateStatusWithReason(form) {
//     // get form data with image and files
//     var data = new FormData(form[0]);
//     axios
//         .post($("#page-axios-data").data("update-status"), data)
//         .then(function (response) {
//             $("#reason-modal").find('textarea').val('');
//             $("#reason-modal").modal("hide");
//             console.log('reject btn', response.data.data.id);
//             let btn = $("#status_button_" + response.data.data.id);
//             btn.removeClass()

//             btn.addClass('btn btn-danger');
//             btn.text('Rejected');
//             toastr.success(response.data.message, "Success");

//         })
//         .catch((err) => {
//             toastr.error(err.response.data.message, "Error");
//         });
// }


// /**
//  * Update data
//  * @param form
//  */
// function update(form) {
//     // get form data with image and files and then send axios put request
//     var data = new FormData(form[0]);
//     // _method= put in data
//     data.append("_method", "put");
//     axios
//         .post($("#page-axios-data").data("update"), data)
//         .then(function (response) {
//             toastr.success(response.data.message, "Success");
//             $("#edit-modal").modal("hide");
//             form.trigger("reset");
//             $($("#page-axios-data").data("table-id"))
//                 .DataTable()
//                 .ajax.reload(null, false);
//         })
//         .catch((err) => {
//             showAxiosErrors(err);
//         });
// }

// /**
//  * Withdraw request
//  *
// */

// function showWithdrawRequestModal(e) {

//     console.log('showWithdrawRequestModal', e);
//     var url = $(e).data("url");
//     var id = $(e).data("id");
//     console.log(url);

//     axios.get(url, {}).then((res) => {
//         console.log(res);
//         $("#withdraw-request-modal").html(res.data);
//         $("#withdraw-request-modal").modal("show");
//     });

// }

// function downloadURI(uri, name) {
//     var link = document.createElement("a");
//     link.download = name;
//     link.href = uri;
//     link.click();
// }


$('#confirmationModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var form = button.closest('form');
    $('#confirmActionBtn').off('click').on('click', function() {
        form.submit();
    });
});


var showCallBackDataAgent = function() {
    $('#id').val('');
    $('.ajaxForm')[0].reset();
    $('#myAgent').modal('hide');
    location.reload();
}



jQuery(function() {

    "use strict";

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    $('.addAgent').on('click', function() {

        var action_url = $(this).attr('data-add-route');

        $("#acmethodsAgent").val('');
        $('#agent_id').val('');
        $('#country_id').val('').trigger('change');
        $('#agent_name').val('');
        $('#email').val('');
        $('#password').val('');
        $('#phone').val('');
        $('#state').val('');
        $('#zip_code').val('');

        $(".agentForm").attr("action", action_url);

        $('.modal-title').text('Add New Agent');
        $('.actionBtn').text('Add Agent');
        $('#myAgent').modal('show');

    });



});


var showCallBackDataAgent = function() {
    $('#id').val('');
    $('.ajaxForm')[0].reset();
    $('#myAgent').modal('hide');
    // $("#agentinfos").load(" #agentinfos > *");
    location.reload();
}

jQuery(function() {

    "use strict";

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    $('.editAgent').on('click', function(e) {

        e.preventDefault();
        var submit_url = $(this).attr('data-edit-route');
        var action_url = $(this).attr('data-update-route');
        const base_url = window.location.origin;

        $.ajax({
            type: 'GET',
            url: submit_url,
            data: {
                "_token": "{{ csrf_token() }}"
            },
            dataType: 'JSON',
            success: function(res) {

                $("#acmethodsAgent").val('PUT');

                $('#agent_id').val(res.id);
                $('#country_id').val(res.agent_details?.country_id ?? 0).trigger(
                    'change');
                $('#agent_name').val(res.agent_name);
                $('#email').val(res.agent_email);
                $('#phone').val(res.agent_phone);
                $('#allowed_user_no').val(res.allowed_user_number);

                $('#house').val(res.agent_details?.house);
                $('#road').val(res.agent_details?.road);
                $('#post_office').val(res.agent_details?.post_office);
                $('#state').val(res.agent_details?.district);
                $('#zip_code').val(res.agent_details?.zip_code);
                // $('#country_id').val(res.agent_details.country_id);

                $('#owner_name').val(res.agent_details?.owner_name);
                $('#owner_nid_no').val(res.agent_details?.owner_nid_no);
                $('#civil_aviation_no').val(res.agent_details?.civil_aviation_no);

                $('#image_old').val(base_url + '/' + res.agent_details?.owner_img);
                $('#nid_image_old').val(base_url + '/' + res.agent_details?.nid_img);
                $('#aviation_image_old').val(base_url + '/' + res.agent_details
                    ?.civil_aviation_copy);
                $('#owner_sign_old').val(base_url + '/' + res.agent_details
                    ?.owner_digital_sign_img);
                $('#trade_licence_copy_old').val(base_url + '/' + res.agent_details
                    ?.trade_license_img)

                if (res.status == '1') {
                    $('#verify').prop('checked', true);
                }
                if (res.status == '2') {
                    $('#pending').prop('checked', true);
                }
                if (res.status == '3') {
                    $('#cancel').prop('checked', true);
                }

                $(".agentForm").attr("action", action_url);

                $('.modal-title').text('Update Information');
                $('.actionBtn').text('Update');
                $('#myAgent').modal('show');

            },
            error: function(request, status, error) {}
        });


    });

});

function status_update(url, e) {

    let status = $(e).data('status');

    let txt = $(e).parent().siblings(".dropdown-toggle").text();
    // console.log('txt',txt.trim());
    if (txt.trim() == 'Rejected') {
        console.log('Already Rejected');
        toastr.error('Already Rejected', "Error");
        return false;
    }

    if (txt.trim() == 'Approved') {
        console.log('Already Approved');
        toastr.error('Already Approved', "Error");
        return false;
    }

    if (status == 2) {
        $('#status-id').val($(e).data('id'));
        $('#reason-modal').modal('show');
    } else {


        axios
            .post(url, {
                status: status,
                id: $(e).data('id')
            })
            .then(({
                data: t
            }) => {

                console.log(t.data.is_approve);




                if (t.data.is_approve == 1) {
                    let btn = $("#status_button_" + t.data.id);
                    console.log('Approved btn', btn);
                    btn.removeClass()

                    btn.addClass('btn btn-success');
                    btn.text('Approved');
                    toastr.success(t.data.message, "Success");
                } else if (t.data.is_approve == 2) {
                    let btn = $("#status_button_" + t.data.id);
                    console.log('reject btn', btn);
                    btn.removeClass()

                    btn.addClass('btn btn-danger');
                    btn.text('Rejected');
                    toastr.success(t.data.message, "Success");
                } else {
                    let btn = $("#status_button_" + t.data.id);
                    console.log('Pending btn', btn);
                    btn.removeClass()

                    btn.addClass('btn btn-warning');
                    btn.text('Pending');
                    toastr.success("Customer Status Successfully Updated.");
                }
            })
            .catch((err) => {

            });

    }
}

function status_update(url, e) {

    axios
        .post(url, {
            status: $(e).data('status'),
            id: $(e).data('id')
        })
        .then(({
            data: t
        }) => {
            console.log(t.data);

            if (t.data.is_approve == 1) {
                let btn = $("#status_button_" + t.data.id);
                console.log('Approved btn', btn);
                btn.removeClass()

                btn.addClass('btn btn-success');
                btn.text('Approved');
                toastr.success(t.data.message, "Success");
            } else {
                let btn = $("#status_button_" + t.data.id);
                console.log('Pending btn', btn);
                btn.removeClass()

                btn.addClass('btn btn-danger');
                btn.text('Pending');
                toastr.success("Customer Status Successfully Updated.");
            }
        })
        .catch((err) => {
            // $("#status_id_" + s).val(a);
            // if (err.response.data.message) {
            //     toastr.error(err.response.data.message, "Error");
            // } else {
            //     toastr.error("Failed to Update User Status");
            // }
        });
}




$('#confirmationModal').on('show.bs.modal', function(event) {
    var button = $(event.relatedTarget);
    var form = button.closest('form');
    $('#confirmActionBtn').off('click').on('click', function() {
        form.submit();
    });
});



var showCallBackDataAgent = function() {
    $('#id').val('');
    $('.ajaxForm')[0].reset();
    $('#myAgent').modal('hide');
    location.reload();
}



jQuery(function() {

    "use strict";

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    $('.addAgent').on('click', function() {

        var action_url = $(this).attr('data-add-route');

        $("#acmethodsAgent").val('');
        $('#agent_id').val('');
        $('#country_id').val('').trigger('change');
        $('#agent_name').val('');
        $('#email').val('');
        $('#password').val('');
        $('#phone').val('');
        $('#state').val('');
        $('#zip_code').val('');

        $(".agentForm").attr("action", action_url);

        $('.modal-title').text('Add New Agent');
        $('.actionBtn').text('Add Agent');
        $('#myAgent').modal('show');

    });



});

