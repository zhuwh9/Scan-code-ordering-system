var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var OrderSchema = new Schema({
	rasturant_id: String,
	order_num: String,
	table_num: String,
	order_time: String,
	menu: String,
	total_num: String,
	total_price: String,
}, {collection:'Order'});

var Order = mongoose.model('Order', OrderSchema);
