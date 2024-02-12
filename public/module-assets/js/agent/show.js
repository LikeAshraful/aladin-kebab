var showCallBackDataAgent = function() {
    $('#id').val('');
    $('.ajaxForm')[0].reset();
    $('#myAgent').modal('hide');
    // $("#agentinfos").load(" #agentinfos > *");
    location.reload();
}

$(document).ready(function() {

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
