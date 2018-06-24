var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FoodSchema = new Schema({
	restaurant_id: String,
	food_name: String,
	food_type: String,
	food_price: String,
	food_description: String,
	picture_url: String,
}, {collection:'Food'});

var Food = mongoose.model('Food', FoodSchema);
