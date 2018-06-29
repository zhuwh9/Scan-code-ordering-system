var http = require('http');
//var jQuery = require('jquery');


/**********************************************
		descrition  : customer to take a order
		method		: POST
 		path		: /order
 *********************************************/
var time = new Date();
var data = JSON.stringify({
	restaurant_id: '123456',
	table_num: '1',
	order_time: time,
	menu: [
		{'menu_name':encodeURI('螺蛳粉'),'price':'13','num':'2'},
		{'menu_name':encodeURI('过桥米线','utf-8'),'price':'11','num':'1'}
	],
	total_num: '2',
	total_price: '$30'
 });

var options = {
	host: '192.168.43.233',
	path: '/order',
	port: '5000',
	method: 'POST',
	headers: {
        'Content-Type':'application/json;charset=UTF-8',
        'Content-Length':data.length
    }
};



/**********************************************
		descrition  : restaurant to add food
		method		: POST
 		path		: /addFood
 *********************************************/
// var data = JSON.stringify({
// 	restaurant_id: '123456',
// 	food_name: 'chicken',
// 	food_type: 'meat',
// 	food_price: '$100',
// 	food_description: 'a delicious chicken meat',
// 	picture_url: 'chicken'
// });

// var options = {
// 	host: '192.168.43.233',
// 	path: '/addFood',
// 	port: '5000',
// 	method: 'POST',
// 	headers: {
//         'Content-Type':'application/json;charset=UTF-8',
//         'Content-Length':data.length
//     }
// };




/**********************************************
		descrition  : restaurant to delete food
		method		: POST
 		path		: /deleteFood
 *********************************************/
// 	var data = JSON.stringify({
// 	restaurant_id: '123456',
// 	food_name: 'chicken'
// });

// var options = {
// 	host: '192.168.59.160',
// 	path: '/deleteFood',
// 	port: '5000',
// 	method: 'POST',
// 	headers: {
//         'Content-Type':'application/json;charset=UTF-8',
//         'Content-Length':data.length
//     }
// };




/**********************************************
		descrition  : restaurant to get alls orders
		method		: POST
 		path		: /receiveAllOrder
*********************************************/
// var data = JSON.stringify({
// 	restaurant_id: '123456'
//  });

// var options = {
// 	host: '192.168.59.160',
// 	path: '/receiveAllOrder',
// 	port: '5000',
// 	method: 'POST',
// 	headers: {
//         'Content-Type':'application/json;charset=UTF-8',
//         'Content-Length':data.length
//     }
// };




/**********************************************
		descrition  : restaurant to get orders every 10s
		method		: POST
 		path		: /receiveOrder
 *********************************************/
// var time = new Date();
// var data = JSON.stringify({
// 	restaurant_id: '123456',
// 	order_time: time
//  });

// var options = {
// 	host: '192.168.59.160',
// 	path: '/receiveOrder',
// 	port: '5000',
// 	method: 'POST',
// 	headers: {
//         'Content-Type':'application/json;charset=UTF-8',
//         'Content-Length':data.length
//     }
// };


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
req.write(data);
req.end();