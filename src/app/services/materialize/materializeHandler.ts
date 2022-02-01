import 'materialize-css';

class MaterializeHandler {
    initSidenav() {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    }

    initDatePicker() {
        const elems = document.querySelectorAll('.datepicker');
        M.Datepicker.init(elems, { yearRange: [1930, 2022], defaultDate: new Date() });
    }
}

export default MaterializeHandler;
