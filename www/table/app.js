


const ctx = document.getElementById('en').getContext('2d');

const chart = new Chart(ctx, {
    type: 'scatter',
    data: {},
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
            title: {
                display: true,
                text: 'ค่าการเคลื่อนตัว (de และ dn) '
            },
            zoom: {
                pan: {
                    enabled: true,
                    mode: 'xy',
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    pinch: {
                        enabled: true
                    },
                    drag: {
                        enabled: false
                    },
                    mode: 'xy',
                },
            },
        },
        scales: {
            x: {
                min: -6000,
                max: 6000,
                title: {
                    display: true,
                    text: 'de (cm)'
                },
                grid: {
                    display: true,
                    drawTicks: true,
                    drawBorder: true,
                    lineWidth: function (context) {
                        if (context.tick.value == 0) {
                            return 2;
                        } {
                            return 0.5;
                        }
                    },
                    color: function (context) {
                        if (context.tick.value == 0) {
                            return '#6e6b6b';
                        } {
                            return '#bfbfbf';
                        }
                    }
                }
            },
            y: {
                min: -6000,
                max: 6000,
                title: {
                    display: true,
                    text: 'dn (cm)'
                },
                grid: {
                    display: true,
                    drawTicks: true,
                    drawBorder: true,
                    lineWidth: function (context) {
                        if (context.tick.value == 0) {
                            return 2;
                        } {
                            return 0.5;
                        }
                    },
                    color: function (context) {
                        if (context.tick.value == 0) {
                            return '#6e6b6b';
                        } {
                            return '#bfbfbf';
                        }
                    }
                }
            }
        }
    },
});

const resetZoom = () => {
    chart.resetZoom();
}

const x = {
    type: 'time',
    time: {
        displayFormats: {
            'millisecond': 'h:mm a',
            'second': 'DD MMM h:mm a',
            'minute': 'DD MMM h:mm a',
            'hour': 'DD MMM YYYY h:mm a',
            'day': 'DD MMM h:mm ',
            'week': 'DD MMM YYYY h:mm a',
            'month': 'DD MMM YYYY h:mm a',
            'quarter': 'DD MMM YYYY h:mm a',
            'year': 'DD MMM YYYY',
        }
    },
}
const zoom = {
    pan: {
        enabled: true,
        mode: 'x',
    },
    zoom: {
        wheel: {
            enabled: true,
        },
        pinch: {
            enabled: true
        },
        drag: {
            enabled: false
        },
        mode: 'x',
    },
}

// chart h
const cth = document.getElementById('h').getContext('2d');
// var timeFormat = 'YYYY/MM/DD HH:mm:ss';
const chartH = new Chart(cth, {
    type: 'line',
    data: {},
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
            title: {
                display: true,
                text: 'ค่า H Difference (dh)'
            },
            tooltip: true,
            zoom: zoom
        },
        scales: {
            x: x,
            y: {
                title: {
                    display: true,
                    text: 'dh (cm)'
                }
            }
        }
    }
});
const resetZoomH = () => {
    chartH.resetZoom();
}

// chart e
const cte = document.getElementById('e').getContext('2d');
var timeFormat = 'YYYY/MM/DD HH:mm:ss';
const chartE = new Chart(cte, {
    type: 'line',
    data: {},
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
            title: {
                display: true,
                text: 'ค่า E Difference (de)'
            },
            tooltip: true,
            zoom: zoom
        },
        scales: {
            x: x,
            y: {
                title: {
                    display: true,
                    text: 'de (cm)'
                }
            },
        }
    },
});

const resetZoomE = () => {
    chartE.resetZoom();
}

// chart n
const ctn = document.getElementById('n').getContext('2d');
var timeFormat = 'YYYY/MM/DD HH:mm:ss';
const chartN = new Chart(ctn, {
    type: 'line',
    data: {},
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: true
            },
            title: {
                display: true,
                text: 'ค่า N Difference (dn)'
            },
            tooltip: true,
            zoom: zoom
        },
        scales: {
            x: x,
            y: {
                title: {
                    display: true,
                    text: 'dn (cm)'
                }
            },
        }
    },
});

const resetZoomN = () => {
    chartN.resetZoom();
}

const checkPoints = function (remove) {

}

let showData = async (data) => {
    let table = $('#tab').DataTable({
        ajax: {
            type: 'POST',
            url: 'https://rtk-landmos.com:3000/api/selectdata',
            data: data,
            dataSrc: 'data',
            cache: true,
        },
        columns: [
            { data: 'sta_code_t' },
            { data: 'de' },
            { data: 'dn' },
            { data: 'dh' },
            { data: 'status' },
            { data: 'ts7t' }
        ],
        dom: 'Bfrtip',
        buttons: [
            'excel', 'print'
        ],
        responsive: true,
        scrollX: true,
        order: [[5, 'asc']],
    });

    table.on('search.dt', async () => {
        let dat = table.rows({ search: 'applied' }).data();
        let arr = [];
        let h = [];
        let e = [];
        let n = [];

        dat.map(async (i) => {
            if (i.de != 0 && i.dn != 0 && i.dh != 0) {
                arr.push({ x: i.de, y: i.dn })
                e.push({ x: i.ts7, y: i.de, z: i.status })
                n.push({ x: i.ts7, y: i.dn, z: i.status })
                h.push({ x: i.ts7, y: i.dh, z: i.status })
            }
        })

        chart.data = {
            datasets: [{
                label: 'station ' + data.stat_code,
                backgroundColor: 'rgb(255, 99, 132)',
                data: arr,
            }],
        };
        chart.update();

        chartH.data = {
            datasets: [{
                label: 'station ' + data.stat_code,
                // backgroundColor: 'rgb(255, 99, 132)',
                data: h,
                showLine: false,
            }]
        };
        chartH.data.datasets[0].backgroundColor = [];
        for (i in chartH.data.datasets[0].data) {
            if (chartH.data.datasets[0].data[i].z == 1) {
                chartH.data.datasets[0].backgroundColor[i] = 'green';
            } else if (chartH.data.datasets[0].data[i].z == 2) {
                chartH.data.datasets[0].backgroundColor[i] = 'yellow';
            } else if (chartH.data.datasets[0].data[i].z == 3) {
                chartH.data.datasets[0].backgroundColor[i] = 'red';
            } else {
                chartH.data.datasets[0].backgroundColor[i] = 'gray';
            }
        }
        chartH.scales.x.min = new Date(data.start_date).valueOf();
        chartH.scales.x.max = new Date(data.end_date).valueOf();
        chartH.update();

        chartE.data = {
            datasets: [{
                label: 'station ' + data.stat_code,
                backgroundColor: 'rgb(255, 99, 132)',
                data: e,
                showLine: false
            }]
        };
        chartE.data.datasets[0].backgroundColor = [];
        for (i in chartE.data.datasets[0].data) {
            if (chartE.data.datasets[0].data[i].z == 1) {
                chartE.data.datasets[0].backgroundColor[i] = 'green';
            } else if (chartE.data.datasets[0].data[i].z == 2) {
                chartE.data.datasets[0].backgroundColor[i] = 'yellow';
            } else if (chartE.data.datasets[0].data[i].z == 3) {
                chartE.data.datasets[0].backgroundColor[i] = 'red';
            } else {
                chartE.data.datasets[0].backgroundColor[i] = 'gray';
            }
        }
        chartE.scales.x.min = new Date(data.start_date).valueOf();
        chartE.scales.x.max = new Date(data.end_date).valueOf();
        chartE.update();

        chartN.data = {
            datasets: [{
                label: 'station ' + data.stat_code,
                backgroundColor: 'rgb(255, 99, 132)',
                data: n,
                showLine: false
            }]
        };
        chartN.data.datasets[0].backgroundColor = [];
        for (i in chartN.data.datasets[0].data) {
            if (chartN.data.datasets[0].data[i].z == 1) {
                chartN.data.datasets[0].backgroundColor[i] = 'green';
            } else if (chartN.data.datasets[0].data[i].z == 2) {
                chartN.data.datasets[0].backgroundColor[i] = 'yellow';
            } else if (chartN.data.datasets[0].data[i].z == 3) {
                chartN.data.datasets[0].backgroundColor[i] = 'red';
            } else {
                chartN.data.datasets[0].backgroundColor[i] = 'gray';
            }
        }
        chartN.scales.x.min = new Date(data.start_date).valueOf();
        chartN.scales.x.max = new Date(data.end_date).valueOf();
        chartN.update();
    });

    // let findData = function () {
    //     console.log(this.value);
    //     table.search(this.value).draw();
    // }
    // document.getElementById("tam").addEventListener("change", findData);
}

// var aa = "2022-05-31T17:40:00.000Z"
// var dd = moment(aa);
// var cc = new Date(aa);
// console.log(dd);
// console.log(cc);

const today = moment().format('YYYY-MM-DD')
const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
const stat_code = '10';
$("#start_date").val(yesterday);
$("#end_date").val(today);
$("#stat_code").val('10');
showData({ stat_code: stat_code, start_date: yesterday, end_date: today })

const getData = () => {
    let stat_code = $("#stat_code").val();
    let start_date = $("#start_date").val();
    let end_date = $("#end_date").val();
    $("#tab").dataTable().fnDestroy();
    showData({ stat_code, start_date, end_date })
}

let closeModal = () => {
    $('#checkModal').modal('hide')
}
