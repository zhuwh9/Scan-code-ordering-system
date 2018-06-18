var express = require('express');

module.exports = function(app) {
	//var user = require('../controllers/user_controller.js');
	//var film = require('../controllers/film_controller.js');
	//var comment = require('../controllers/comment_controller.js');
	//var sms = require('../controllers/ihuyi.js');
	//var send_message = new sms();

	var restaurant = require('../controllers/restaurant_controller.js');
	var system = require('../controllers/system_controller.js');

	app.use('/static', express.static('./static'));
	


	/*********************************************************************/
	//user's behavior
	app.get('/', function(req, res) {
		console.log('request to route /');
		res.render('wecome to restuarant!');
	});

	qpp.get('/restaurant',  restaurant.getRestaurantData);	//render restaurant's page and foods

	app.post('/order', system.generateOrder);
		//send order to restaurant
		//...
	//end user's behavior
	/*********************************************************************/



	/*********************************************************************/
	//restaurant's behavior
	app.get('/merchantRegister', function(req, res) {
		//render register page
		//...
	});

	app.post('/merchantRegister', restaurant.register);

	app.get('/merchantLogin', function(req, res) {
		//render login page
	});

	app.post('/merchantLogin', restaurant.login);

	app.post('/addFood', restaurant.addFood);

	app.post('/deleteFood', restaurant.deleteFood);

	app.post('/acceptOrder', function(req, res) {
		//send confirmation to user
		//...
	});

	//end restaurant's behavior
	/*********************************************************************/

}
