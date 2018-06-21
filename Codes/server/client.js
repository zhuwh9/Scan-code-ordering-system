var http = require('http');
var jQuery = require('jquery');

	// to add food
// 	var data = JSON.stringify({
// 	rastaurant_id: '18819253726',
// 	food_name: 'chicken',
// 	food_type: 'meat',
// 	food_price: '$100',
// 	food_description: 'a delicious chicken meat',
// 	picture_url: 'chicken'
// });

//	to get food list
// 	var data = JSON.stringify({
// 	rastaurant_id: '18819253726'
// });

//	to delete food
// 	var data = JSON.stringify({
// 	rastaurant_id: '18819253726',
// 	food_name: 'chicken'
// });

//	to take a order
	// var time = new Date();
	// var data = JSON.stringify({
	// rastaurant_id: '18819253726',
	// table_num: '1',
	// order_time: time,
	// menu: 'chicken',
	// total_num: '2',
	// total_price: '$30'
 // });

	//to receive order
	var time = new Date();
	console.log("time is " + time);
	var data = JSON.stringify({
	rastaurant_id: '18819253726',
	time: time
 });

var options = {
	host: '192.168.59.159',
	path: '/receiveOrder',
	//path: '/order',
	port: '5000',
	method: 'POST',
	headers: {
        'Content-Type':'application/json',
        'Content-Length':data.length
    }
};

console.log("the post data is:");
console.log(data);

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

console.log("receive data is:");
req.write(data);
req.end();
