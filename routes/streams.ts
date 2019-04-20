/*
 * GET websocket streams.
 */
import express = require('express');
const router = express.Router();

let twitterCounter = 0;
let twitterStreamIntervalId;

// GET Websocket Stream listings
router.ws('/twitter_followers', function (ws, req) {
    ws.on('message', function (msg) {
        ws.send(`msg: ${msg}`);
    });

    twitterStreamIntervalId = setInterval(
        function () {
            switch (ws.readyState) {
                case ws.OPEN:
                    ws.send(twitterCounter);
                    twitterCounter++;
                    break;

                case ws.CLOSED: stopTwitterStream();
                default:
                    break;
            }
        }, 2000
    );
});

function stopTwitterStream() {
    clearInterval(twitterStreamIntervalId);
}

// GET Twitter Followers
router.get('/twitter', (req: express.Request, res: express.Response) => {
    res.send("1");
});

export default router;