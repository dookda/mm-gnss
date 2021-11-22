
$("#status_sta01").html("starting...");
$("#btn_sta01").prop("disabled", true);

$("#status_sta02").html("starting...");
$("#btn_sta02").prop("disabled", true);

$("#status_sta03").html("starting...");
$("#btn_sta03").prop("disabled", true);

$("#status_sta04").html("starting...");
$("#btn_sta04").prop("disabled", true);

$("#status_sta05").html("starting...");
$("#btn_sta05").prop("disabled", true);

$("#status_sta06").html("starting...");
$("#btn_sta06").prop("disabled", true);

$("#status_sta07").html("starting...");
$("#btn_sta07").prop("disabled", true);

$("#status_sta08").html("starting...");
$("#btn_sta08").prop("disabled", true);

$("#status_sta09").html("starting...");
$("#btn_sta09").prop("disabled", true);

$("#status_sta10").html("starting...");
$("#btn_sta10").prop("disabled", true);


let startPy = (station) => {
    axios.post('/api/startpython', { station }).then(r => {
        $("#status_sta" + station).html("starting...");
        $("#btn_sta" + station).prop("disabled", true);
        console.log(r)
    });
}

let stopPy = (station) => {
    axios.post('/api/stoppython', { station }).then(r => {
        $("#status_sta" + station).html("stoped");
        $("#btn_sta" + station).prop("disabled", false);
        console.log(r)
    });
}