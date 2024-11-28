const mongoose = require('mongoose');
const MenuSchema = mongoose.Schema({
    name: {type: String, require: true},
    price: {type: String, require: true}
})
const restaurantSchema = mongoose.Schema({
    name: { type: String, required: true },
    serving: { type: String, required: true },
    location: { type: String, required: true },
    menu: [MenuSchema]
}, { _id: true });  // Mongoose will automatically create an ObjectId for the _id field

const Restaurants = mongoose.model('Restaurants', restaurantSchema);

module.exports = Restaurants;
