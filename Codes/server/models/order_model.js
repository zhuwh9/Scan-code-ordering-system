var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	order_num: {type: String, unique:true},
	resturant_id: String,
	table_num: String,
	order_time: Number,
	menu: String,
	total_num: String,
	total_price: String,
}, {collection:'Order'});

var Order = mongoose.model('Order', OrderSchema);
