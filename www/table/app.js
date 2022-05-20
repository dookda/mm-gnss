


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
                min: -80,
                max: 80,
                title: {
                    display: true,
                    text: 'de'
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
                min: -80,
                max: 80,
                title: {
                    display: true,
                    text: 'dn'
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
var timeFormat = 'YYYY/MM/DD HH:mm:ss';
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
            zoom: {
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
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'dh'
                }
            },
        }
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
            zoom: {
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
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'de'
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
            zoom: {
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
            },
        },
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'dn'
                }
            },
        }
    },
});

const resetZoomN = () => {
    chartN.resetZoom();
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
        let arr1 = [];
        let h1 = [];
        let e1 = [];
        let n1 = [];

        let arr2 = [];
        let h2 = [];
        let e2 = [];
        let n2 = [];

        let ts1 = [];
        let ts2 = [];
        let ts;
        await dat.map(i => {
            // console.log(i, data);
            if (i.stat_code === data.stat_code1) {
                // console.log(i);
                arr1.push({ x: i.de, y: i.dn })
                h1.push(i.dh)
                e1.push(i.de)
                n1.push(i.dn)
                ts1.push(i.ts7t)
            } else {
                arr2.push({ x: i.de, y: i.dn })
                h2.push(i.dh)
                e2.push(i.de)
                n2.push(i.dn)
                ts2.push(i.ts7t)
            }
            ts = ts1.length == 0 ? ts2 : ts1;
        })

        chart.data = {
            datasets: [{
                label: 'station ' + data.stat_code1,
                backgroundColor: 'rgb(255, 99, 132)',
                data: arr1
            }, {
                label: 'station ' + data.stat_code2,
                backgroundColor: '#32a852',
                data: arr2
            }],
        };
        chart.update();

        chartH.data = {
            labels: ts,
            datasets: [{
                label: 'station ' + data.stat_code1,
                backgroundColor: 'rgb(255, 99, 132)',
                data: h1,
                showLine: false
            }, {
                label: 'station ' + data.stat_code2,
                backgroundColor: '#32a852',
                data: h2,
                showLine: false
            }]
        };
        chartH.update();

        chartE.data = {
            labels: ts,
            datasets: [{
                label: 'station ' + data.stat_code1,
                backgroundColor: 'rgb(255, 99, 132)',
                data: e1,
                showLine: false
            }, {
                label: 'station ' + data.stat_code2,
                backgroundColor: '#32a852',
                data: e2,
                showLine: false
            }]
        };
        chartE.update();

        chartN.data = {
            labels: ts,
            datasets: [{
                label: 'station ' + data.stat_code1,
                backgroundColor: 'rgb(255, 99, 132)',
                data: n1,
                showLine: false
            }, {
                label: 'station ' + data.stat_code2,
                backgroundColor: '#32a852',
                data: n2,
                showLine: false
            }]
        };
        chartN.update();
    });

    // let findData = function () {
    //     console.log(this.value);
    //     table.search(this.value).draw();
    // }
    // document.getElementById("tam").addEventListener("change", findData);
}

const today = moment().format('YYYY-MM-DD')
const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
const stat_code1 = '10';
const stat_code2 = '07';
$("#start_date").val(yesterday);
$("#end_date").val(today);
$("#stat_code1").val('10');
$("#stat_code2").val('07');
showData({ stat_code1: stat_code1, stat_code2: stat_code2, start_date: yesterday, end_date: today })

const getData = () => {
    let stat_code1 = $("#stat_code1").val();
    let stat_code2 = $("#stat_code2").val();
    let start_date = $("#start_date").val();
    let end_date = $("#end_date").val();

    if (stat_code1 === stat_code2) {
        $("#checkModal").modal("show")
    } else {
        // console.log(stat_code, start_date, end_date);
        $("#tab").dataTable().fnDestroy();
        showData({ stat_code1, stat_code2, start_date, end_date })
    }
}

let closeModal = () => {
    $('#checkModal').modal('hide')
}
