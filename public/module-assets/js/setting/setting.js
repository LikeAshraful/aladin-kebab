// start exclude airline
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



function onDelete(e){
    var action_url = $(e).data('route');
    console.log('route is ',action_url);

    Swal.fire({
        title: 'Are you sure to remove the exclude airline code ?',
        showCancelButton: true,
        confirmButtonText: 'Yes',

        }).then((result) => {
        if (result.isConfirmed) {

            $.ajax({
                url: action_url,
                type: 'DELETE',
                success: function(res){
                    Swal.fire(res.message, '',   res.success ? 'success' : 'warning');
                    reloadTable();
                },
                error: function(){
                    Swal.fire('Changes are not saved', '', 'info')
                }

            });

        }
    })

}

$(document).ready(function() {
    "use strict";

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });


    $('.show-modal').on('click', function() {
        $('show-modal input').val('');
        var action_url = $(this).attr('data-add-route');
        $('#form-modal-id').modal('show');
    });


});

// end of exclude airline
