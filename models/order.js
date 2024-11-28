const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderStatus: {type: String, required: true},
    /* driver: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Driver", // Linking this to the User model
        required: true, }, */
    driver: {
        type:mongoose.Types.ObjectId,
        ref: "Driver",
    },
    meal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant/Menu",
        required: true,
    },
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", // Linking this to the User model
        required: true, },
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant",
        required: true,
    }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
