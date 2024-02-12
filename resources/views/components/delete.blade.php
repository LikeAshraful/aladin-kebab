<form action="" method="POST" id="delete-form" style="display: none">
    @csrf
    @method('Delete')
</form>
<script src="{{admin_asset('js/delete.min.js')}}"></script>