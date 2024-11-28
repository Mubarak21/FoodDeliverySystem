
const mongoose = require('mongoose');

const driverSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    available: {type: Boolean, default: true},
    order: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Order", // Linking this to the User model
         },

});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;
