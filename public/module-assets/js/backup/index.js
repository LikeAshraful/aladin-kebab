$("#backup-table").DataTable({
    order: [[3, "desc"]],
});

function createBackup(mode = null) {
    var url = $("#page-axios-data").data("create-delete-backup-url");
    var $modal = $("#create-backup-modal");
    $modal.modal("show");
    axios
        .post(url, {
            option: mode,
        })
        .then((res) => {
            location.reload();
        })
        .catch((err) => {
            location.reload();
        });
}

function deleteBackup() {
    var url = $("#page-axios-data").data("delete-backup-url");
    var $modal = $("#delete-backup-modal");
    $modal.modal("show");
    axios
        .delete(url)
        .then((res) => {
            location.reload();
        })
        .catch((err) => {
            location.reload();
        });
}
