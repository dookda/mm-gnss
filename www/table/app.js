
const legend = {
    position: 'top',
    display: true,
    labels: {
        usePointStyle: true,
        boxWidth: 10,
        fontSize: 8
    }
}
const x = {
    type: 'time',
    time: {
        displayFormats: {
            'millisecond': 'h:mm a',
            'second': 'DD MMM h:mm a',
            'minute': 'DD MMM h:mm a',
            'hour': 'DD MMM h:mm a',
            'day': 'DD MMM YYYY',
            'week': 'DD MMM YYYY',
            'month': 'DD MMM YYYY',
            'quarter': 'DD MMM YYYY',
            'year': 'DD MMM YYYY',
        }
    },
}
const zoom = {
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
}

const ctx = document.getElementById('en').getContext('2d');
const chart = new Chart(ctx, {
    type: 'scatter',
    data: {},
    options: {
        responsive: true,
        plugins: {
            legend: legend,
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
                min: -300,
                max: 3000,
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
                min: -300,
                max: 4500,
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

// chart h
const cth = document.getElementById('h').getContext('2d');
const chartH = new Chart(cth, {
    type: 'line',
    data: {},
    options: {
        animation: false,
        spanGaps: true,
        responsive: true,
        plugins: {
            legend: legend,
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
        },
    },
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
        animation: false,
        spanGaps: true,
        responsive: true,
        plugins: {
            legend: legend,
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
        animation: false,
        spanGaps: true,
        responsive: true,
        plugins: {
            legend: legend,
            // title: {
            //     display: true,
            //     text: 'ค่า N Difference (dn)'
            // },
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

        let en0 = []
        dat.filter(i => i.status == 0).map(i => en0.push({ x: i.de, y: i.dn, z: i.status }))
        let en1 = []
        dat.filter(i => i.status == 1).map(i => en1.push({ x: i.de, y: i.dn, z: i.status }))
        let en2 = []
        dat.filter(i => i.status == 2).map(i => en2.push({ x: i.de, y: i.dn, z: i.status }))
        let en3 = []
        dat.filter(i => i.status == 3).map(i => en3.push({ x: i.de, y: i.dn, z: i.status }))
        let en4 = []
        dat.filter(i => i.status == 4).map(i => en4.push({ x: i.de, y: i.dn, z: i.status }))

        let h0 = []
        dat.filter(i => i.status == 0).map(i => h0.push({ x: i.ts7, y: i.dh, z: i.status }))
        let h1 = []
        dat.filter(i => i.status == 1).map(i => h1.push({ x: i.ts7, y: i.dh, z: i.status }))
        let h2 = []
        dat.filter(i => i.status == 2).map(i => h2.push({ x: i.ts7, y: i.dh, z: i.status }))
        let h3 = []
        dat.filter(i => i.status == 3).map(i => h3.push({ x: i.ts7, y: i.dh, z: i.status }))
        let h4 = []
        dat.filter(i => i.status == 4).map(i => h4.push({ x: i.ts7, y: i.dh, z: i.status }))

        let e0 = []
        dat.filter(i => i.status == 0).map(i => e0.push({ x: i.ts7, y: i.de, z: i.status }))
        let e1 = []
        dat.filter(i => i.status == 1).map(i => e1.push({ x: i.ts7, y: i.de, z: i.status }))
        let e2 = []
        dat.filter(i => i.status == 2).map(i => e2.push({ x: i.ts7, y: i.de, z: i.status }))
        let e3 = []
        dat.filter(i => i.status == 3).map(i => e3.push({ x: i.ts7, y: i.de, z: i.status }))
        let e4 = []
        dat.filter(i => i.status == 4).map(i => e4.push({ x: i.ts7, y: i.de, z: i.status }))

        let n0 = []
        dat.filter(i => i.status == 0).map(i => n0.push({ x: i.ts7, y: i.dn, z: i.status }))
        let n1 = []
        dat.filter(i => i.status == 1).map(i => n1.push({ x: i.ts7, y: i.dn, z: i.status }))
        let n2 = []
        dat.filter(i => i.status == 2).map(i => n2.push({ x: i.ts7, y: i.dn, z: i.status }))
        let n3 = []
        dat.filter(i => i.status == 3).map(i => n3.push({ x: i.ts7, y: i.dn, z: i.status }))
        let n4 = []
        dat.filter(i => i.status == 4).map(i => n4.push({ x: i.ts7, y: i.dn, z: i.status }))


        chart.data = {
            datasets: [{
                spanGaps: true,
                backgroundColor: 'green',
                label: 'สถานะ 0',
                data: en0,
                showLine: false,
            }, {
                backgroundColor: 'yellow',
                label: "สถานะ 1",
                data: en1,
                showLine: false,
            }, {
                backgroundColor: 'orange',
                label: "สถานะ 2",
                data: en2,
                showLine: false,
            }, {
                backgroundColor: 'red',
                label: "สถานะ 3",
                data: en3,
                showLine: false,
            }, {
                backgroundColor: 'gray',
                label: "สถานะ 4",
                data: en4,
                showLine: false,
            }]
        };
        chart.update();

        chartH.data = {
            datasets: [{
                spanGaps: true,
                backgroundColor: 'green',
                label: 'สถานะ 0',
                data: h0,
                showLine: false,
            }, {
                backgroundColor: 'yellow',
                label: "สถานะ 1",
                data: h1,
                showLine: false,
            }, {
                backgroundColor: 'orange',
                label: "สถานะ 2",
                data: h2,
                showLine: false,
            }, {
                backgroundColor: 'red',
                label: "สถานะ 3",
                data: h3,
                showLine: false,
            }, {
                backgroundColor: 'gray',
                label: "สถานะ 4",
                data: h4,
                showLine: false,
            }]
        };
        chartH.scales.x.min = new Date(data.start_date).valueOf();
        chartH.scales.x.max = new Date(data.end_date).valueOf();
        chartH.update();
        chartH.resetZoom();

        chartE.data = {
            datasets: [{
                spanGaps: true,
                backgroundColor: 'green',
                label: 'สถานะ 0',
                data: e0,
                showLine: false,
            }, {
                backgroundColor: 'yellow',
                label: "สถานะ 1",
                data: e1,
                showLine: false,
            }, {
                backgroundColor: 'orange',
                label: "สถานะ 2",
                data: e2,
                showLine: false,
            }, {
                backgroundColor: 'red',
                label: "สถานะ 3",
                data: e3,
                showLine: false,
            }, {
                backgroundColor: 'gray',
                label: "สถานะ 4",
                data: e4,
                showLine: false,
            }]
        };
        chartE.scales.x.min = new Date(data.start_date).valueOf();
        chartE.scales.x.max = new Date(data.end_date).valueOf();
        chartE.update();
        chartE.resetZoom();

        chartN.data = {
            datasets: [{
                spanGaps: true,
                backgroundColor: 'green',
                label: 'สถานะ 0',
                data: n0,
                showLine: false,
            }, {
                backgroundColor: 'yellow',
                label: "สถานะ 1",
                data: n1,
                showLine: false,
            }, {
                backgroundColor: 'orange',
                label: "สถานะ 2",
                data: n2,
                showLine: false,
            }, {
                backgroundColor: 'red',
                label: "สถานะ 3",
                data: n3,
                showLine: false,
            }, {
                backgroundColor: 'gray',
                label: "สถานะ 4",
                data: n4,
                showLine: false,
            }]
        };
        chartN.scales.x.min = new Date(data.start_date).valueOf();
        chartN.scales.x.max = new Date(data.end_date).valueOf();
        chartN.update();
        chartN.resetZoom();
    });

    // let findData = function () {
    //     console.log(this.value);
    //     table.search(this.value).draw();
    // }
    // document.getElementById("tam").addEventListener("change", findData);
}

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
