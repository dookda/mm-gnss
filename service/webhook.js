const express = require('express');
const app = express.Router();
const line = require("@line/bot-sdk");
const config = require("./config.json")
const con = require("./db");
const db = con.db;



const client = new line.Client(config)

app.post("/webhook", line.middleware(config), (req, res) => {
    Promise.all(req.body.events.map(event => {
        console.log('event', event);
        return handleEvent(event);
    })).then(() => res.end()).catch((err) => {
        console.error(err);
        res.status(500).end();
    });

    res.sendStatus(200)
})

const replyText = (token, texts) => {
    texts = Array.isArray(texts) ? texts : [texts];
    return client.replyMessage(
        token,
        texts.map((text) => ({ type: 'text', text }))
    );
};

// callback function to handle a single event
function handleEvent(event) {
    switch (event.type) {
        case 'message':
            const message = event.message;
            switch (message.type) {
                case 'text':
                    return handleText(message, event.replyToken);
                case 'image':
                    return handleImage(message, event.replyToken);
                case 'video':
                    return handleVideo(message, event.replyToken);
                case 'audio':
                    return handleAudio(message, event.replyToken);
                case 'location':
                    return handleLocation(message, event.replyToken);
                case 'sticker':
                    return handleSticker(message, event.replyToken);
                default:
                    throw new Error(`Unknown message: ${JSON.stringify(message)}`);
            }

        case 'follow':
            return replyText(event.replyToken, 'Got followed event');

        case 'unfollow':
            return console.log(`Unfollowed this bot: ${JSON.stringify(event)}`);

        case 'join':
            return replyText(event.replyToken, `Joined ${event.source.type}`);

        case 'leave':
            return console.log(`Left: ${JSON.stringify(event)}`);

        case 'postback':
            let data = event.postback.data;
            return replyText(event.replyToken, `Got postback: ${data}`);

        case 'beacon':
            const dm = `${Buffer.from(event.beacon.dm || '', 'hex').toString('utf8')}`;
            return replyText(event.replyToken, `${event.beacon.type} beacon hwid : ${event.beacon.hwid} with device message = ${dm}`);

        default:
            throw new Error(`Unknown event: ${JSON.stringify(event)}`);
    }
}

function handleText(message, replyToken) {
    return replyText(replyToken, message.text);
}

function handleImage(message, replyToken) {
    return replyText(replyToken, 'Got Image');
}

function handleVideo(message, replyToken) {
    return replyText(replyToken, 'Got Video');
}

function handleAudio(message, replyToken) {
    return replyText(replyToken, 'Got Audio');
}

function handleLocation(message, replyToken) {
    return replyText(replyToken, 'Got Location');
}

function handleSticker(message, replyToken) {
    return replyText(replyToken, 'Got Sticker');
}

app.post("/pushmsg", (req, res) => {
    const msg = {
        type: 'text',
        text: 'Hello World! from push message'
    };
    const userId = 'U6c3e40fc26082a586c961f40fe239e3a'
    client.pushMessage(userId, msg)
});

app.get("/api/alert/:station/:status", (req, res) => {
    var station = req.params.station;
    var status = req.params.status;
    var status_txt = "";
    console.log(station, status)
    
    if (status == 1) {
        status_txt = "เล็กน้อย (10-20 cm)"
    }else if (status == 2) {
        status_txt = "ปานกลาง (20-30 cm)"
    }else if (status == 3) {
        status_txt = "ค่อนข้างสูง (>30 cm)"
    }

    const sql = `SELECT userid FROM user_tb`;
    let usrArr = []
    db.query(sql).then(async (r) => {

        r.rows.forEach(i => {
            usrArr.push(i.userid);
        })

        const msg1 = {
            type: 'text',
            text: `มีการเคลื่อนตัวของสถานี ${station} ในระยะ ${status_txt}`
        };

        const msg2 = {
            "type": "template",
            "altText": "This is a buttons template",
            "template": {
                "type": "buttons",
                "thumbnailImageUrl": "https://example.com/bot/images/image.jpg",
                "imageAspectRatio": "rectangle",
                "imageSize": "cover",
                "imageBackgroundColor": "#FFFFFF",
                "title": "ชื่อ gnss",
                "text": "สถานะล่าสุด",
                "defaultAction": {
                    "type": "uri",
                    "label": "View detail",
                    "uri": "http://example.com/page/123"
                },
                "actions": [
                    {
                        "type": "uri",
                        "label": "ดูข้อมูลเพิ่มเติม",
                        "uri": "http://example.com/page/123"
                    }
                ]
            }
        }

        // client.multicast(usrArr, [msg1, msg2])
        client.multicast(usrArr, [msg1])

    });
});


module.exports = app;