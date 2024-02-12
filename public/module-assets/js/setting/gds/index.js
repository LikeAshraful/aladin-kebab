
function reloadTable(){
    let tableId = $('table:first').attr('id');
    $('#'+tableId).DataTable().ajax.reload();
}

var showCallBackData = function() {
    $('#id').val('');
    $('.ajaxForm')[0].reset();
    $('#form-modal-id').modal('hide');
    reloadTable();
}


function onEdit(e){
    $('#form-modal-id').modal('show');
    let edit_url = $(e).data('edit-route');
    let update_url = $(e).data('update-route');

    $('form#ajaxForm').attr('action',update_url);
    $('form#ajaxForm').attr('method','PUT');

    $('.modal-title').text('Update {{ config("theme.title") }}')
    $('#create_submit').text('Update');

    $.ajax({
        url: edit_url,
        type: 'GET',
        success: function(res){
            let policy = res.data;
            let form = $('#ajaxForm');
            $('#method_id').val('PUT');
            for (const [key, value] of Object.entries(policy)) {
                $('#ajaxForm input[name='+key+']').val(value);
                $('#ajaxForm input[name='+key+']').prop('checked', value);
                $('#ajaxForm select[name='+key+']').val(value).trigger('change');
            }
            $('#ajaxForm input[name="policy_name"]').prop("disabled", true);

        },


    });


    console.log('route is ',action_url);
}



$(document).ready(function() {
    "use strict";

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    $('.show-modal').on('click', function() {
        $('.modal-title').text('Add New {{ config("theme.title") }}')
        $('#create_submit').text('Add')
        $('form#ajaxForm input').val('');
        $('form#ajaxForm select').val('').trigger('change');
        $('form#ajaxForm input[type=checkbox]').prop('checked',false);

        let action_url = $(this).attr('data-add-route');
        $('form#ajaxForm').attr('action', action_url);
        $('form#ajaxForm').attr('method', 'POST');
        $('#ajaxForm input[name="policy_name"]').prop("disabled", false);
        $('#form-modal-id').modal('show');
    });

});
