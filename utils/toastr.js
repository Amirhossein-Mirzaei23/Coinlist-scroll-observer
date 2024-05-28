import toastr from "toastr"
import "toastr/build/toastr.min.css"
toastr.options = {
    "closeButton": true,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": true,
    "onclick": null,
    "showDuration": "500",
    "hideDuration": "1000",
    "timeOut": "9000",
    "extendedTimeOut": "3000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

  export default {
    success(message) {
        toastr.success(message)
    },
    info(message) {
        toastr.info(message);
    },
    error(message) {
        toastr.error(message);
    },
    warning(message) {
        toastr.warning(message);
    }
  }