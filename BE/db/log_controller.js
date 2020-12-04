// include product model
const Log = require('./log');

// create a new Log.
exports.log_create = function (req, res) {
    // validate request
    if (!req.body.url || !req.body.time) {
        return res.status(400).send({
            success: false,
            message: "Please enter product name and price"
        });
    }

    // create a Log
    let log = new Log(
        {
            url: req.body.url,
            time: req.body.time
        }
    );

    // save log in the database.
    log.save()
        .then(data => {
            res.send({
                success: true,
                message: 'Product successfully created',
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while creating log."
            });
        });
};

// retrieve and return all logs.
exports.all_logs = (req, res) => {
    Log.find()
        .then(data => {
            var message = "";
            if (data === undefined || data.length == 0) message = "No log found!";
            else message = 'Logs successfully retrieved';

            res.send({
                success: true,
                message: message,
                data: data
            });
        }).catch(err => {
            res.status(500).send({
                success: false,
                message: err.message || "Some error occurred while retrieving logs."
            });
        });
};
