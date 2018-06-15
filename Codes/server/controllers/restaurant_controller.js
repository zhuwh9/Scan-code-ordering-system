var mongoose = require('mongoose');
var Restaurant = mongoose.model('Restaurant');
var Food = mongoose.model('Food');


exports.getRestaurantData = function(req, res) {
	//var table_id = req.body.table_id;
	//var restaurant_id = req.body.restaurant_id;
	Food.find({restaurant_id: req.query.restaurant_id})
	.exec(function(err, foods) {
		console.log(foods.length);
			if(err) {
				console.log(err);
				res.status(404);
				res.end();
				//return [];
			} else {
				console.log('ok');
				var fooddata = {data: []};
				for (food in foods) {
					console.log(food);
					var data = {
						food_name: foods[food].food_name,
						food_type: foods[food].food_type,
						food_price: foods[food].food_price,
						food_description: foods[food].food_description,
						picture_url: foods[food].picture_url
					}
					fooddata.data.push(data);
				}
				res.status(200).json(fooddata);
				res.end();
				//return restaurants;
			}
	});	
}

exports.addFood = function(req, res) {
	var rastaurant_id = req.body.rastaurant_id;
	var food_name = req.body.food_name;
	var food_type = req.body.food_type;
	var food_price = req.body.food_price;
	var food_description = req.body.food_description;
	var picture_url = "/static/foods/images/";

	var food = new Food();
		food.set('rastaurant_id', rastaurant_id);
		food.set('food_name', food_name);
		food.set('food_type', food_type);
		food.set('food_price', food_price);
		food.set('food_description', food_description);
		food.set('picture_url', picture_url);
		food.save(function(err) {
			if(err) {
				console.log(err);
				//req.session.error = 'error';
				res.status(404);
				res.end();
			} else {
				console.log("ok");
				//req.session.msg = 'success';
				res.status(200).json(data);
				res.end();
			}
		});
};

exports.deleteFood = function(req, res) {

};