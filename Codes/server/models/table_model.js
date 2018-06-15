var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = new Schema({
	tableid: {type: String, unique: true},
	restaurant_id: String,
}, {collection:'User'});

var Table = mongoose.model('User', TableSchema);
