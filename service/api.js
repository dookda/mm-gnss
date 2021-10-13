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

module.exports = app;