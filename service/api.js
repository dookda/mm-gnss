const { default: axios } = require('axios');
const express = require('express');

const app = express.Router();
const con = require("./db");
const db = con.db;

const path = require('path')
const { spawn } = require('child_process')

app.get("/api/basestation", (req, res) => {
    const sql = `SELECT * FROM base_sta`;
    db.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/api/lastposition", (req, res) => {
    const { stat_code } = req.body;
    // console.log(stat_code);
    const sql = `SELECT * FROM dataset WHERE stat_code = '${stat_code}' 
            AND ts = (SELECT MAX(ts) FROM dataset WHERE stat_code = '${stat_code}')`;
    db.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/api/last20position", (req, res) => {
    const { stat_code } = req.body;
    // console.log(stat_code);
    const sql = `select a.* from (SELECT stat_code, de, dn, dh, status,
        TO_CHAR(ts,'HH24:MI') as t, TO_CHAR(ts, 'DD-MM-YYYY') as d
    FROM dataset WHERE stat_code='${stat_code}' ORDER BY ts DESC limit 20) a
    ORDER BY a.t ASC`;
    db.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/api/reset", (req, res) => {
    const { stat_code, id } = req.body;
    // console.log(stat_code);
    const sql = `UPDATE dataset SET status=0 WHERE id=${id}`;
    db.query(sql).then((r) => {
        res.status(200).json({
            status: 'ok'
        });
    });
});

app.post("/api/register", (req, res) => {
    const { userid, username, email } = req.body;
    const sql = `INSERT INTO user_tb(userid,username,email,dt)VALUES('${userid}','${username}','${email}',now())`;
    db.query(sql).then(() => {
        console.log(sql);
        res.status(200).json({
            status: "ลงทะเบียนสำเร็จ"
        });
    });
});


let selectLastdata = (station) => {
    const sql = `SELECT stat_code, status FROM dataset d
                WHERE ts = (SELECT MAX(ts) FROM dataset e 
                            WHERE e.stat_code = '${station}')  
                AND d.stat_code = '${station}'`;
    db.query(sql).then((r) => {
        // console.log(r.rows.length);
        if (r.rows.length > 0) {
            let station = r.rows[0].stat_code;
            let status_text = r.rows[0].status;

            axios.get(`https://rti2dss.com:3510/api/testapi/${station}/${status_text}`).then(x => {
                console.log(x.data);
            })
        }
    });
}


app.post("/api/stop", (req, res) => {
    axios.get(`https://rti2dss.com:3510/api/stop/${station}`).then(r => {
        console.log(x.data);
        res.status(200).json({
            status: "stop"
        });
    })
})

app.post("/api/start", (req, res) => {
    axios.get(`https://rti2dss.com:3510/api/stop/${station}`).then(r => {
        console.log(x.data);
        res.status(200).json({
            status: "stop"
        });
    })
})


setInterval(() => {
    selectLastdata("01");
    selectLastdata("02")
    selectLastdata("03")
    selectLastdata("04")
    selectLastdata("05")
    selectLastdata("06")
    selectLastdata("07")
}, 5000)


// function runScript(station) {
//     return spawn('python3', [
//         "-u",
//         path.join(__dirname, 'alert_station.py'),
//         station
//     ]);
// }

// let subprocess01 = runScript("01")
// let subprocess02 = runScript("02")
// let subprocess03 = runScript("03")
// let subprocess04 = runScript("04")
// let subprocess05 = runScript("05")
// let subprocess06 = runScript("06")
// let subprocess07 = runScript("07")
// let subprocess08 = runScript("08")
// let subprocess09 = runScript("09")
// let subprocess10 = runScript("10")

// let startsubprocess = (subprocess) => {
//     subprocess.stdout.on('data', (data) => {
//         console.log(`data:${data}`);
//         return `data:${data}`;
//     });
// }

// startsubprocess(subprocess01)
// startsubprocess(subprocess02)
// startsubprocess(subprocess03)
// startsubprocess(subprocess04)

// app.post('/api/startpython', (req, res) => {
//     const { station } = req.body;
//     let resp;

//     if (station == "01") {
//         subprocess01 = null;
//         subprocess01 = runScript("01");
//         resp = startsubprocess(subprocess01);

//         res.status(200).json({
//             status: "start"
//         });
//     }
//     if (station == "02") {
//         subprocess02 = null;
//         subprocess02 = runScript("02");
//         resp = startsubprocess(subprocess02);

//         res.status(200).json({
//             status: "start"
//         });
//     }
//     if (station == "03") {
//         subprocess03 = null;
//         subprocess03 = runScript("03")
//         resp = startsubprocess(subprocess03);

//         res.status(200).json({
//             status: "start"
//         });
//     }
//     if (station == "04") {
//         subprocess04 = runScript("04")
//         resp = startsubprocess(subprocess04);

//         res.status(200).json({
//             status: "start"
//         });
//     }
//     if (station == "05") {
//         subprocess05 = runScript("05")
//         resp = startsubprocess(subprocess05);

//         res.status(200).json({
//             status: "start"
//         });
//     }
//     if (station == "06") {
//         subprocess06 = runScript("06")
//         resp = startsubprocess(subprocess06);

//         res.status(200).json({
//             status: "start"
//         });
//     }
//     if (station == "07") {
//         subprocess07 = runScript("07")
//         resp = startsubprocess(subprocess07);

//         res.status(200).json({
//             status: "start"
//         });
//     }
//     if (station == "08") {
//         subprocess08 = runScript("08")
//         resp = startsubprocess(subprocess08);

//         res.status(200).json({
//             status: "start"
//         });
//     }
//     if (station == "09") {
//         subprocess09 = runScript("09")
//         resp = startsubprocess(subprocess09);

//         res.status(200).json({
//             status: "start"
//         });
//     }
//     if (station == "10") {
//         subprocess10 = runScript("10")
//         resp = startsubprocess(subprocess10);

//         res.status(200).json({
//             status: "start"
//         });
//     }
// })

// app.post('/api/stoppython', (req, res) => {
//     const { station } = req.body;
//     let subprocess;
//     station == "01" ? subprocess = subprocess01 : null;
//     station == "02" ? subprocess = subprocess02 : null;
//     station == "03" ? subprocess = subprocess03 : null;
//     station == "04" ? subprocess = subprocess04 : null;
//     station == "05" ? subprocess = subprocess05 : null;
//     station == "06" ? subprocess = subprocess06 : null;
//     station == "07" ? subprocess = subprocess07 : null;
//     station == "08" ? subprocess = subprocess08 : null;
//     station == "09" ? subprocess = subprocess09 : null;
//     station == "10" ? subprocess = subprocess10 : null;

//     subprocess.kill('SIGTERM');

//     subprocess.stderr.on('data', (data) => {
//         console.log(`error:${data}`);
//     });
//     subprocess.stderr.on('close', () => {
//         console.log("Closed");
//     });
//     res.status(200).json({
//         status: `${station} Stop`
//     })
// })


module.exports = app;