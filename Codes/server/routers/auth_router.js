var express = require('express');

module.exports = function(app) {

	var restaurant = require('../controllers/restaurant_controller.js');
	var system = require('../controllers/system_controller.js');

	app.use('/static', express.static('./static'));
	


	/*********************************************************************/
	//user's behavior

	app.get('/', function(req, res) {
		console.log('Wecome!');
	});

	app.post('/restaurant',  restaurant.getRestaurantData);	//render restaurant's page and foods

	app.post('/order', system.generateOrder);

	//end user's behavior
	/*********************************************************************/



	/*********************************************************************/
	//restaurant's behavior
	app.get('/merchantRegister', function(req, res) {
		//render register page
		//...
	});

	app.post('/merchantRegister',function(req, res) {
		//render login page
	});

	app.get('/merchantLogin', function(req, res) {
		//render login page
	});

	app.post('/merchantLogin', function(req, res) {
		//render login page
	});

	app.post('/addFood', restaurant.addFood);

	app.post('/deleteFood', restaurant.deleteFood);

	app.post('/receiveOrder', restaurant.receiveOrder);

	//end restaurant's behavior
	/*********************************************************************/

}
