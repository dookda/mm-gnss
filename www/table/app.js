


const ctx = document.getElementById('en').getContext('2d');

const chart = new Chart(ctx, {
    type: 'scatter',
    data: {},
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: true,
                text: 'ค่าการเคลื่อนตัวของ de และ dn '
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
const charth = new Chart(cth, {
    type: 'line',
    data: {},
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                display: false
            },
            title: {
                display: true,
                text: 'ค่าการเคลื่อนตัวแนว dh'
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
            xAxes: [{
                type: "time",
                time: {
                    format: timeFormat,
                    tooltipFormat: 'll'
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }],
        }
    },
});

const resetZoomh = () => {
    charth.resetZoom();
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
            { data: 'stat_code' },
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
        scrollX: true
    });

    table.on('search.dt', async () => {
        let data = table.rows({ search: 'applied' }).data();
        let arr = []
        let h = []
        let ts = []
        await data.map(i => {
            arr.push({ x: i.de, y: i.dn })
            h.push(i.dh)
            ts.push(i.ts7t)
        })
        console.log(ts);
        chart.data = {
            datasets: [{
                label: 'de',
                backgroundColor: 'rgb(255, 99, 132)',
                data: arr
            }],
        };
        chart.update();

        charth.data = {
            labels: ts,
            datasets: [{
                label: 'dh',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: h,
            }]
        };
        charth.update();
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
$("#stat_code").val('10')
showData({ stat_code: stat_code, start_date: yesterday, end_date: today })

const getData = () => {
    let stat_code = $("#stat_code").val();
    let start_date = $("#start_date").val();
    let end_date = $("#end_date").val();
    console.log(stat_code, start_date, end_date);
    $("#tab").dataTable().fnDestroy();
    showData({ stat_code, start_date, end_date })
}

