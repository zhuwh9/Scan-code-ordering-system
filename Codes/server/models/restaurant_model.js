var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RestaurantSchema = new Schema({
	restaurant_id: {type: String, unique: true}
	restaurant_name: String,
	password_hash: {type: String, required: true},
	//telnumber: {type: String, default: ""},
	email: {type: String, default: ""},
	avatar_url: {type:String, default: ""},		//to add a picture url here
	//food_dbname: String,
	//table_dbname: String,
}, {collection:'Restaurant'});

var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
