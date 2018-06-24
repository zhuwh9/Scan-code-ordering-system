var express = require('express');

module.exports = function(app) {

	var restaurant = require('../controllers/restaurant_controller.js');
	var system = require('../controllers/system_controller.js');

	app.use('/static', express.static('./static'));
	


	/*
	**************user's behaviors******************************************
	*/

	//render home page
	app.get('/', function(req, res) {
		console.log('Wecome!');
		//res.render('');
	});

	//render food lists
	app.get('/restaurant',  restaurant.getRestaurantData);

	//get order datas from coutomer and generate order
	app.post('/order', system.generateOrder);

	app.get('/menu', restaurant.getMenuData);

	app.get('/getOrder', system.getOrder);
	
	//end user's behavior
	/*********************************************************************/



	/*
	**************restaurant's behaviors******************************************
	*/
	app.get('/merchantRegister', function(req, res) {
		console.log('render register page!');
	});

	app.post('/merchantRegister',function(req, res) {
		console.log('register!');
	});

	app.get('/merchantLogin', function(req, res) {
		console.log('render login page!');
	});

	app.post('/merchantLogin', function(req, res) {
		console.log('login!');
	});

	app.post('/addFood', restaurant.addFood);

	app.post('/deleteFood', restaurant.deleteFood);

	app.post('/receiveOrder', restaurant.receiveOrder);
	app.get('/receiveOrder', restaurant.receiveOrder);

	/*
	**************end restaurant's behaviors**************************************
	*/

}
