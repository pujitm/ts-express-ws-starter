/*
 * GET websocket streams.
 */
import express = require('express');
const router = express.Router();

// GET Websocket Stream listings
router.get('/', (req: express.Request, res: express.Response) => {
    res.send("respond with stream listings");
});

export default router;