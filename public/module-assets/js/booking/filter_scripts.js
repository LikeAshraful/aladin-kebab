
// alpine related js
const airLineCheck = {
    changeAirLineSelectAll(event) {
        const isChecked = event.target.checked;
        const newFilterValue = isChecked;

        $('input[data-airline]').each((i, node) => {
            let airline = node.dataset.airline;
            node.checked = isChecked;
            filterConfig.airlines[airline] = newFilterValue;
        });

        filterConfig.isAirlinesDirty = !isChecked;
        applyFilter();
    }
};


// t select state
const takeOffCheckbox = {
    t_0: false,
    t_6: false,
    t_12: false,
    t_18: false,
    t_select_all: false,

    handleTChange() {
        if (this.t_0 && this.t_6 && this.t_12 && this.t_18) {
            this.t_select_all = true;
        } else {
            this.t_select_all = false;
        }
    },

    changeTakeOffSelectAll(event) {
        const isChecked = event.target.checked;
        $('input[data-takeoffCheck]').each((i, node) => {
            node.checked = isChecked;
            filterConfig.takeOff.fill(!isChecked)
        });

        takeOffFilter(0, 24);
    }
};

const arrivalCheckbox = {
    a_0: false,
    a_6: false,
    a_12: false,
    a_18: false,
    a_select_all: false,

    handleAChange() {
        if (this.a_0 && this.a_6 && this.a_12 && this.a_18) {
            this.a_select_all = true;
        } else {
            this.a_select_all = false;
        }
    },

    arrivalSelectAll(event) {
        const isChecked = event.target.checked;
        $('input[data-arrivalCheck]').each((i, node) => {
            node.checked = isChecked;
            filterConfig.arrival.fill(!isChecked)
        });

        arrivalFilter(0, 24, true);

    }
};

const stopCheckbox = {
    nonStop: false,
    oneStop: false,
    multiStop: false,
    stop_select_all: false,

    handleSelectAllChange() {
        this.nonStop = this.oneStop = this.multiStop = this.stop_select_all;

        filterConfig.stop.NonStop = this.stop_select_all;
        filterConfig.stop.OneStop = this.stop_select_all;
        filterConfig.stop.MultiStop = this.stop_select_all;

        applyFilter();
    },

    handleChange() {
        this.stop_select_all = this.nonStop && this.oneStop && this.multiStop;
    },
};

document.addEventListener('alpine:init', () => {
    Alpine.store('airLineCheck', airLineCheck)
    Alpine.store('takeOffCheckbox', takeOffCheckbox);
    Alpine.store('arrivalCheckbox', arrivalCheckbox);
    Alpine.store('stopCheckbox', stopCheckbox);
});

const filterConfig = {
    takeOff: new Array(24).fill(true),
    arrival: new Array(24).fill(true),
    stop: {
        'NonStop': true,
        'OneStop': true,
        'MultiStop': true,
    },
    isAirlinesDirty: false,
    airlines: {}
}

window.filterConfig = filterConfig

$(document).ready(() => {
    $('input[data-airline]').each((index, node) => {
        const airline = node.dataset.airline
        filterConfig.airlines[airline] = false
    })
})


const airlineFilter = (node) => {
    filterConfig.isAirlinesDirty = true
    const airline = node.dataset.airline
    filterConfig.airlines[airline] = !filterConfig.airlines[airline]
    applyFilter()
}

const clearAirlineFilter = () => {
    $('#airline-select-all').prop('checked', false)
    $('input[data-airline]').each((i, node) => {
        let airline = node.dataset.airline
        node.checked = false
        filterConfig.airlines[airline] = true
    })
    filterConfig.isAirlinesDirty = false
    applyFilter()
}


const applyFilter = () => {
    $('[data-stop-info]').each((i, node) => {
        let takeOff = node.dataset.takeOff
        let arrivalTime = node.dataset.arrivalTime
        let stopInfo = node.dataset.stopInfo
        let airline = node.dataset.airline
        let isAirlineVisible = true
        takeOff = parseInt(takeOff)
        arrivalTime = arrivalTime.split(':')[0]
        arrivalTime = parseInt(arrivalTime)

        if (filterConfig.isAirlinesDirty) {
            isAirlineVisible = filterConfig.airlines[airline]
        }

        if (filterConfig.arrival[arrivalTime] && filterConfig.takeOff[takeOff] && filterConfig.stop[stopInfo] && isAirlineVisible) {
            $(node).toggle(true)
        } else {
            $(node).toggle(false)
        }

    })

    $('#total_flights').text(
        $('[data-take-off]:visible').length
    )

    console.log('filterConfig ', filterConfig)
}


const takeOffFilter = (start, end) => {
    start = parseInt(start)
    end = parseInt(end)

    for (let i = start; i < end; i++) {
        filterConfig.takeOff[i] = !filterConfig.takeOff[i]
    }
    applyFilter()
}


const clearTakeOff = () => {
    $('#take-off-time-select-all').prop('checked', false)
    $('input[data-takeoffCheck]').each((i, node) => {
        node.checked = false
    })
    filterConfig.takeOff.fill(false)
}


const arrivalFilter = (start, end, forceDisplay) => {
    start = parseInt(start)
    end = parseInt(end)

    for (let i = start; i < end; i++) {
        filterConfig.arrival[i] = !filterConfig.arrival[i]
    }
    applyFilter()
}


const clearArrivalFilter = () => {
    $('#arrival-time-select-all').prop('checked', false)
    $('input[data-arrivalCheck]').each((i, node) => {
        node.checked = false
    })
    filterConfig.arrival.fill(false)
}


const applyStopFilter = (stopType) => {

    console.log(stopType, filterConfig.stop[stopType])

    filterConfig.stop[stopType] = !filterConfig.stop[stopType]
    applyFilter()
}

const clearStopFilter = () => {
    $('#stopInfo-select-all').prop('checked', false)
    $('#stopInfo-NonStop').prop('checked', false)
    $('#stopInfo-OneStop').prop('checked', false)
    $('#stopInfo-MultiStop').prop('checked', false)

    filterConfig.stop.NonStop = true
    filterConfig.stop.OneStop = true
    filterConfig.stop.MultiStop = true

    applyFilter()

}


// checkbox click for airline
$('.custom-control-input').change(function (id) {

    if (this.dataset.name == 'airline') {
        let a = $('[data-airline]').filter((index, item) => item.dataset.airline == this.name)[0];
        airlineFilter(a);
    }

    let keyword = this.id.split(`-${this.name}`)[0];

    if (keyword == 'take-off-time') {
        start = parseInt(this.name);
        takeOffFilter(start, start + 6)
    } else if (keyword == 'arrival-time') {
        start = parseInt(this.name);
        arrivalFilter(start, start + 6, false);
    } else if (keyword == 'stopInfo') {
        applyStopFilter(this.name);
    } else {
        applyFilter();
    }

})


