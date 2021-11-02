const { default: axios } = require('axios');
const express = require('express');
const app = express.Router();
const con = require("./db");
const db = con.db;

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
    const sql = `SELECT * FROM dataset
            WHERE stat_code = '${stat_code}' 
            AND ts = (
                SELECT MAX(ts) FROM dataset WHERE stat_code = '${stat_code}')`;
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
    const { stat_code, value } = req.body;
    // console.log(stat_code);
    const sql = `INSERT INTO dataset(stat_code, ts, status)VALUES('${stat_code}', now(), ${value})`;
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

setInterval(() => {
    selectLastdata("01");
    selectLastdata("02")
    selectLastdata("03")
    selectLastdata("04")
    selectLastdata("05")
    selectLastdata("06")
    selectLastdata("07")
}, 5000)



module.exports = app;