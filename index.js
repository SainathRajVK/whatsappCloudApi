var express = require('express');
var axios = require("axios");
require('dotenv').config()
var app = express();

app.use(express.json())

// getting whastsapp msg res
app.get('/webhooks', (req, res) => {
    return res.status(200).send("hi")
    let mode = req.query['hub.mode'];
    let verify_token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    if (mode && mode === 'subscribe') {
        res.status(200).send(challenge)
    } else {
        res.status(404);
    }
})
// posting whastsapp msg 
app.post('/whatsapp-output', (req, res) => {
    let body = req.body;
    console.log(body)
    if (body) {
        let phoneId = process.env.PHONE_ID;
        let from = body.from;
        axios.post({
            method: "POST",
            url: "https://graph.facebook.com/v15.0/" + phoneId + "/messages?access_token=" + body.access_token,
            data: {
                messaging_product: "whatsapp",
                to: from,
                text: {
                    body: body.message
                }
            },
            headers: {
                "Content-type": "application/json"
            }
        })

        res.status(200).send("Sent SuccessFully")
    } else {
        res.status(403);
    }

})

app.get('/', (req, res) => {
    res.status(200).send("Working")
})
app.listen(5000 | process.env.PORT, () => {
    console.log("server is running at port 5000");
})