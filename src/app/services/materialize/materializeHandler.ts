import 'materialize-css';

class MaterializeHandler {
    initSidenav() {
        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});
    }

    initDatePicker() {
        const elems = document.querySelectorAll('.datepicker');
        M.Datepicker.init(elems, {
            yearRange: [1930, 2021],
            defaultDate: new Date('January 01, 2012 00:00:00'),
            maxDate: new Date('January 01, 2020 00:00:00'),
        });
    }
}

export default MaterializeHandler;
