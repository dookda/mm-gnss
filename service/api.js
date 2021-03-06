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
            AND timestamp = (
                SELECT MAX(timestamp) FROM dataset WHERE stat_code = '${stat_code}')`;
    db.query(sql).then((r) => {
        res.status(200).json({
            data: r.rows
        });
    });
})

app.post("/api/insertdiff", (req, res) => {
    const { stat_code, diff } = req.body;
    // console.log(stat_code);
    const sql = `INSERT INTO dataset(stat_code, timestamp, diff)VALUES('${stat_code}', now(), ${diff})`;
    db.query(sql).then((r) => {
        res.status(200).json({
            status: 'ok'
        });
    });
})

module.exports = app;