var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = new Schema({
	user_name: {type: String},
	film_name: {type: String},
	timestamp: {type: Date},
	theater: {type: String},
	seat: {type: String},
	price: {type: String},
	text: String
}, {collection:'Ticket'});

var Ticket = mongoose.model('Ticket', TicketSchema);
