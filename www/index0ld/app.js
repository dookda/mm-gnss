const { default: axios } = require("axios");

var map = L.map('map', {
    center: [18.359549715002537, 99.69806926182481],
    zoom: 13,
    zoomControl: false
});

var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    lyr: 'basemap'
});
var CartoDB_DarkMatter = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    lyr: 'basemap'
});

var CartoDB_Positron = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: 'abcd',
    maxZoom: 19,
    lyr: 'basemap'
});

const grod = L.tileLayer('https://{s}.google.com/vt/lyrs=r&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyr: 'basemap'
});
const ghyb = L.tileLayer('https://{s}.google.com/vt/lyrs=y,m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    lyr: 'basemap'
});

var prov = L.tileLayer.wms("http://rti2dss.com:8080/geoserver/wms?", {
    layers: 'th:province_4326',
    format: 'image/png',
    transparent: true,
    attribution: "sakda"
});

let lyrs = L.layerGroup();


var baseMap = {
    "แผนที่ OSM": osm,
    "แผนที่ CartoDB": CartoDB_Positron,
    "แผนที่ถนน": grod,
    "แผนที่ภาพถ่าย": ghyb.addTo(map)
}

var overlayMap = {
    "ตำแหน่งสถานีตรวจวัด": lyrs.addTo(map),
    "ขอบเขตจังหหวัด": prov.addTo(map)
}

L.control.layers(baseMap, overlayMap).addTo(map)
L.control.zoom({ position: 'bottomright' }).addTo(map);

let icongreen = L.icon({
    iconUrl: './marker/location-pin-green.svg',
    iconSize: [35, 35],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

let iconyellow = L.icon({
    iconUrl: './marker/location-pin-yellow.svg',
    iconSize: [35, 35],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

let iconred = L.icon({
    iconUrl: './marker/location-pin-red.svg',
    iconSize: [35, 35],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

let rmLyr = (mkname) => {
    map.eachLayer(lyr => {
        if (lyr.options.name == mkname) {
            map.removeLayer(lyr)
        }
    })
}

let changeColorMarker = (id, val) => {
    console.log(val);
    let staLatlon;
    id == '01' ? staLatlon = [18.339672, 99.674849] : null;
    id == '02' ? staLatlon = [18.337106, 99.682434] : null;
    id == '03' ? staLatlon = [18.328093, 99.690406] : null;
    id == '04' ? staLatlon = [18.338522, 99.694236] : null;
    id == '05' ? staLatlon = [18.348869, 99.699504] : null;
    id == '06' ? staLatlon = [18.357983, 99.702851] : null;
    id == '07' ? staLatlon = [18.367473, 99.713365] : null;
    id == '08' ? staLatlon = [18.364072, 99.715371] : null;
    id == '09' ? staLatlon = [18.383051, 99.721390] : null;
    id == '10' ? staLatlon = [18.387062, 99.724952] : null;

    if (val == 2) {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: iconyellow }).bindPopup('สถานี ' + id).addTo(lyrs);
        $("#wrnsta0" + id).attr("src", "./img/yellow.svg");
    } else if (val == 3) {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: iconred }).bindPopup('สถานี ' + id).addTo(lyrs);
        $("#wrnsta0" + id).attr("src", "./img/red.svg");
    } else {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: icongreen }).bindPopup('สถานี ' + id).addTo(lyrs);
        $("#wrnsta0" + id).attr("src", "./img/green.svg");
    }

}

let chart;

let showChart = (sta, data) => {
    chart = Highcharts.chart("sta0" + sta, {
        chart: {
            type: 'spline',
            animation: Highcharts.svg,
            // marginRight: 100,
            events: {
                load: function () {
                    var series = this.series[0];
                    setInterval(async () => {
                        axios.post('http://localhost:3000/api/lastposition', { stat_code: sta }).then((r) => {
                            // console.log(r);
                            let x = (new Date()).getTime();
                            let y = r.data.data[0].status;
                            // changeColorWarning(sta, y)
                            changeColorMarker(sta, y)
                            return series.addPoint([x, y], true, true);
                        })
                    }, 6000);
                }
            },
            zoomType: 'x'
        },

        time: {
            useUTC: false
        },

        title: false,
        accessibility: {
            announceNewData: {
                enabled: true,
                minAnnounceInterval: 15000,
                announcementFormatter: function (allSeries, newSeries, newPoint) {
                    if (newPoint) {
                        return 'New point added. Value: ' + newPoint.y;
                    }
                    return false;
                }
            }
        },

        xAxis: {
            type: 'datetime',
            tickPixelInterval: 120,
            minorTickInterval: 'auto',
            startOnTick: false,
            endOnTick: false
        },

        yAxis: {
            title: {
                text: 'Difference (cm)'
            },
            min: -5,
            max: 5,
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            tickInterval: 1

        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br/>',
            //  pointFormat: '{point.x:%Y-%m-%d %H:%M:%S}<br/>{point.y:.2f} cm'
            pointFormat: 'เวลา {point.x:%H:%M:%S} น.<br/>{point.y:.2f} cm'
        },

        legend: {
            enabled: false
        },

        exporting: {
            enabled: false
        },

        plotOptions: {
            series: {
                marker: {
                    enabled: false
                }
            }
        },

        series: [{
            name: 'difference (cm)',
            data: (function () {
                var data = [],
                    time = (new Date()).getTime(),
                    i;

                for (i = -19; i <= 0; i += 1) {
                    data.push({
                        x: time + i * 1000,
                        y: Math.random()
                    });
                }
                // console.log(data);
                return data;
            }())
        }]
    })
}

let insertData = (stat_code, diff) => {
    if (event.key === "Enter") {
        // console.log(stat_code, diff.value);
        axios.post("http://localhost:3000/api/insertdiff", {
            stat_code: stat_code,
            diff: diff.value
        })
        document.getElementById(stat_code + 'a').value = '';
    }
}

const sta_01 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '01' })
const sta_02 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '02' })
const sta_03 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '03' })
const sta_04 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '04' })
const sta_05 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '05' })
const sta_06 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '06' })
const sta_07 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '07' })
const sta_08 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '08' })
const sta_09 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '09' })
const sta_10 = axios.post('http://localhost:3000/api/lastposition', { stat_code: '10' })


showChart('01', sta_01);
showChart('02', sta_02);
showChart('03', sta_03);
showChart('04', sta_04);
showChart('05', sta_05);
showChart('06', sta_06);
showChart('07', sta_07);
showChart('08', sta_08);
showChart('09', sta_09);
showChart('10', sta_10);


let reset = (stat_code, value) => {
    axios.post("http://localhost:3000/api/reset", { stat_code, value }).then(r => {
        $('#sta0' + stat_code).highcharts().redraw();
    })
    axios.get("http://25.81.83.49/rpidata/setRelay/?cha=3&onoff=0").then(i => console.log("turn off yellow"))
    axios.get("http://25.81.83.49/rpidata/setRelay/?cha=4&onoff=0").then(i => console.log("turn off red"))
}

