var http = require('http');
//var jQuery = require('jquery');


/**********************************************
		descrition  : customer to take a order
		method		: POST
 		path		: /order
 *********************************************/
// var time = new Date();
// var data = JSON.stringify({
// 	restaurant_id: '123456',
// 	table_num: '1',
// 	order_time: time,
// 	menu: [
// 		{'menu_name':encodeURI('螺蛳粉'),'price':'13','num':'2'},
// 		{'menu_name':encodeURI('过桥米线','utf-8'),'price':'11','num':'1'}
// 	],
// 	total_num: '3',
// 	total_price: '$30'
//  });

// var options = {
// 	host: '39.104.73.169',
// 	path: '/order',
// 	port: '80',
// 	method: 'POST',
// 	headers: {
//         'Content-Type':'application/json;charset=UTF-8',
//         'Content-Length':data.length
//     }
// };



/**********************************************
		descrition  : restaurant to get food list
		method		: POST
 		path		: /restaurant
 *********************************************/
// var data = JSON.stringify({
// 	restaurant_id: '123456'
// });

// var options = {
// 	host: '39.104.73.169',
// 	path: '/restaurant',
// 	port: '80',
// 	method: 'POST',
// 	headers: {
//         'Content-Type':'application/json;charset=UTF-8',
//         'Content-Length':data.length
//     }
// };



/**********************************************
		descrition  : restaurant to add food
		method		: POST
 		path		: /addFood
 *********************************************/
var data = JSON.stringify({
	restaurant_id: '123456',
	food_name: 'pork',
	food_type: 'meat',
	food_price: '$200',
	food_description: 'a delicious pork meat',
	picture_url: 'pork'
});

var options = {
	host: '39.104.73.169',
	path: '/addFood',
	port: '80',
	method: 'POST',
	headers: {
        'Content-Type':'application/json;charset=UTF-8',
        'Content-Length':data.length
    }
};




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
// 	host: '39.104.73.169',
// 	path: '/deleteFood',
// 	port: '80',
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
// 	host: '39.104.73.169',
// 	path: '/receiveAllOrder',
// 	port: '80',
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
// 	host: '39.104.73.169',
// 	path: '/receiveOrder',
// 	port: '80',
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