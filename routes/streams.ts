/*
 * GET websocket streams.
 */
import express = require('express');
const router = express.Router();

let twitterCounter = 0;

// GET Websocket Stream listings
router.ws('/echo', function (ws, req) {
    ws.on('message', function (msg) {
        ws.send(msg);
    });

    setInterval(
        function () {
            ws.send(twitterCounter);
        }, 2000
    );
});

// GET Websocket Stream listings
router.get('/twitter', (req: express.Request, res: express.Response) => {
    res.send("respond with stream listings");
});

export default router;