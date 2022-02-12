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

    initSelect() {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems, {});
    }

    initModal() {
        const elems = document.querySelectorAll('.modal');
        M.Modal.init(elems, {});
    }

    initTooltip() {
        const elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems, {});
    }
}

export default MaterializeHandler;
