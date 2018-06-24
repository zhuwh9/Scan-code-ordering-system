var crypto = require('crypto');
var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var Food = mongoose.model('Food');
var Order = mongoose.model('Order');

function hashPW(password) {
	return crypto.createHash('sha256').update(password)
				.digest('base64').toString();
}

exports.getOrder = function(req, res) {
	var resturant_id = req.body.resturant_id;
	Order.find({resturant_id: req.query.restaurant_id})
	.exec(function(err, orders) {
		console.log(orders.length);
			if(err) {
				console.log(err);
				res.status(404);
				res.end();
			} else {
				console.log('ok');
				var orderdata = {data: []};
				for (order in orders) {
					console.log(order);
					var data = {
						order_num: orders[order].order_num,
						resturant_id: orders[order].resturant_id,
						table_num: orders[order].table_num,
						order_time: orders[order].order_time,
						menu: orders[order].menu,
						total_num: orders[order].total_num,
						total_price: orders[order].total_price
					};
					orderdata.data.push(data);
				}
				res.status(200).json(orderdata);
				res.end();
			}
	});
}

exports.generateOrder = function(req, res) {
	var resturant_id = req.body.resturant_id;
	var table_num = req.body.table_num;
	var order_time = req.body.order_time;
	var order_num = hashPW(resturant_id + table_num + order_time);
	var menu = req.body.menu;
	var total_num = req.body.total_num;
	var total_price = req.body.total_price;

	var newDate = new Date();
	newDate.setTime(order_time * 1000);
	console.log('time is:' + newDate.toDateString());

	//add order to db
	var order = new Order({order_num: order_num});
		order.set('table_num', table_num);
		order.set('order_time', order_time);
		order.set('menu', JSON.stringify(menu));
		order.set('total_num', total_num);
		order.set('total_price', total_price);
		order.save(function(err) {
			if(err) {
				console.log(err);
				//req.session.error = 'error';
				res.status(404);
				res.end();
			} else {
				console.log("success");
				//req.session.msg = 'success';
				var data = {
					order_num: order_num,
					table_num: table_num,
					order_time: order_time,
					menu: JSON.stringify(menu),
					total_num: total_num,
					total_price: total_price
				};
				res.status(200).json(data);
				res.end();
			}
		});
}