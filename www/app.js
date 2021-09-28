var map = L.map('map', {
    center: [18.335017, 99.719808],
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


let iconred = L.icon({
    iconUrl: './marker/location-pin-red.svg',
    iconSize: [35, 35],
    iconAnchor: [12, 37],
    popupAnchor: [5, -30]
});

changeColormarker = () => {
    axios.get('http://localhost:3000/api/basestation').then((r) => {

        r.data.data.map(i => {
            let mk = L.marker([i.y_coor, i.x_coor], { name: "marker" });
            mk.bindPopup('สถานี ' + i.stat_name);
            mk.addTo(lyrs);
            console.log(i.y_coor, i.x_coor, i.stat_name)
        })
    })
}

// changeColormarker()

let rmLyr = (mkname) => {
    map.eachLayer(lyr => {
        if (lyr.options.name == mkname) {
            map.removeLayer(lyr)
        }
    })
}

let changeColorWarning = (id, val) => {
    $("#wrn" + id).empty();
    if (val >= 3) {
        $("#wrn" + id).append('<img src="./img/red.svg" width="18px"></img>');
    } else {
        $("#wrn" + id).append('<img src="./img/green.svg" width="18px"></img>');
    }
}

let changeColorMarker = (id, val) => {
    let staLatlon;
    id == 'sta001' ? staLatlon = [18.339672, 99.674849] : null;
    id == 'sta002' ? staLatlon = [18.337106, 99.682434] : null;
    id == 'sta003' ? staLatlon = [18.328093, 99.690406] : null;
    id == 'sta004' ? staLatlon = [18.338522, 99.694236] : null;
    id == 'sta005' ? staLatlon = [18.338522, 99.684236] : null;
    id == 'sta006' ? staLatlon = [18.339672, 99.674849] : null;
    id == 'sta007' ? staLatlon = [18.339672, 99.674849] : null;
    id == 'sta008' ? staLatlon = [18.339672, 99.674849] : null;
    id == 'sta009' ? staLatlon = [18.339672, 99.674849] : null;
    id == 'sta010' ? staLatlon = [18.339672, 99.674849] : null;

    if (val >= 2) {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: iconred }).bindPopup('สถานี ' + id).addTo(lyrs);
    } else if (val < 2) {
        rmLyr(id)
        L.marker(staLatlon, { name: id, icon: icongreen }).bindPopup('สถานี ' + id).addTo(lyrs);
    }

}

let showChart = (sta, data) => {
    Highcharts.chart(sta, {
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
                            changeColorWarning(sta, y)
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

const sta_01 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta001' })
const sta_02 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta002' })
const sta_03 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta003' })
const sta_04 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta004' })
const sta_05 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta005' })
const sta_06 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta006' })
const sta_07 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta007' })
const sta_08 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta008' })
const sta_09 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta009' })
const sta_10 = axios.post('http://localhost:3000/api/lastposition', { stat_code: 'sta010' })


showChart('sta001', sta_01);
showChart('sta002', sta_02);
showChart('sta003', sta_03);
showChart('sta004', sta_04);
showChart('sta005', sta_05);
showChart('sta006', sta_06);
showChart('sta007', sta_07);
showChart('sta008', sta_08);
showChart('sta009', sta_09);
showChart('sta010', sta_10);


