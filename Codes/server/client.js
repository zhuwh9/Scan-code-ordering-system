var http = require('http');
var jQuery = require('jquery');

//	to add food
// var data = JSON.stringify({
// 	restaurant_id: '18819253726',
// 	food_name: 'chicken',
// 	food_type: 'meat',
// 	food_price: '$100',
// 	food_description: 'a delicious chicken meat',
// 	picture_url: 'chicken'
// });
// var options = {
// 	//host: '192.168.59.159',//this is for WWW
// 	host: '127.0.0.1',
// 	path: '/addFood',
// 	port: '5000',
// 	method: 'POST',
// 	headers: {
// 		'Content-Type':'application/json;charset=UTF-8',
// 		'Content-Length':data.length
// 	}
// };
// var req = http.request(options, function(response){
// 	var responsedata = '';
// 	response.on('data', function(chunk){
// 		responsedata += chunk;
// 	});
// 	response.on('end', function(){
// 		responsedata = JSON.parse(responsedata);
// 		console.log(responsedata);
// 	});
// });
// req.on('error', function(e) {
// 	console.log('Error is : ' + e.message);
// });
// req.write(data);
// req.end();
//	to get food list
// 	var data = JSON.stringify({
// 	restaurant_id: '18819253726'
// });

//	to delete food
// 	var data = JSON.stringify({
// 	restaurant_id: '18819253726',
// 	food_name: 'chicken'
// });


// to get the menu
// var options = {
// 	//host: '192.168.59.159',//this is for WWW
// 	host: '127.0.0.1',
// 	path: '/menu?restaurant_id=18819253726',
// 	port: '5000',
// 	method: 'GET'
// };

// var req = http.request(options, function(response){
// 	var responsedata = '';
// 	response.on('fooddata', function(chunk){
// 		responsedata += chunk;
// 	});
// 	response.on('end', function(){
// 		responsedata = JSON.parse(responsedata);
// 		console.log(responsedata);
// 	});
// });
// req.on('error', function(e) {
// 	console.log('Error is : ' + e.message);
// });
// req.end();

//	to take a order
var time = new Date().getTime();
var data = JSON.stringify({
	restaurant_id: '18819253726',
	table_num: '1',
	order_time: time,
	menu: [
		{'menu_name':encodeURI('螺蛳粉','utf-8'),'price':'13','num':'2'},
		{'menu_name':encodeURI('过桥米线','utf-8'),'price':'11','num':'1'}
	],/*'chicken',*/
	total_num: '2',
	total_price: '$30'
 });
var options = {
	//host: '192.168.59.159',//this is for WWW
	host: '127.0.0.1',
	path: '/order',
	port: '5000',
	method: 'POST',
	headers: {
        'Content-Type':'application/json;charset=UTF-8',
        'Content-Length':data.length
    }
};
var req = http.request(options, function(response){
	var responsedata = '';
	response.on('data', function(chunk){
		responsedata += chunk;
	});
	response.on('end', function(){
		responsedata = JSON.parse(responsedata);
		console.log(responsedata);
	});
});
req.on('error', function(e) {
	console.log('Error is : ' + e.message);
});
req.write(data);
req.end();

// to get all orders
var options = {
	//host: '192.168.59.159',//this is for WWW
	host: '127.0.0.1',
	path: '/order?restaurant_id=18819253726',
	port: '5000',
	method: 'GET'
};

var req = http.request(options, function(response){
	var responsedata = '';
	response.on('fooddata', function(chunk){
		responsedata += chunk;
	});
	response.on('end', function(){
		responsedata = JSON.parse(responsedata);
		console.log(responsedata);
	});
});
req.on('error', function(e) {
	console.log('Error is : ' + e.message);
});
req.end();