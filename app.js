const express = require('express');
const app = express();
const item_routes = require('./item_routes')
const expressError = require('./expressError')

app.use(express.json())
app.use('/items', item_routes);


/*
ROUTES -------------------------------------------------------------------------
*/

//GET - ROOT ROUTE
app.get('/', (req, res, next) => {
    try {
        return res.send("Shopping List Exercise")
    } catch (e) {
        next(e)
    }
})





/*
  ERROR HANDLING ---------------------------------------------------------------
*/

// DEFAULT 404 ERROR
app.use((req, res, next) => {
    const e = new ExpressError("Page Not Found", 404);
    next(e);
})

// ERROR HANDLING
app.use((err, req, res, next) => {
    // set defaults
    let status = err.status || 500;
    let message = err.message;

    // set the status and alert users
    return res.status(status).json({
        error: { message, status }
    })
})

module.exports = app;