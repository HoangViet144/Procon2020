const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let LogSchema = new Schema({
    url: { type: String, required: true, max: 1000 },
    time: { type: Number, required: true },
});

// Export the model
module.exports = mongoose.model('Log', LogSchema);