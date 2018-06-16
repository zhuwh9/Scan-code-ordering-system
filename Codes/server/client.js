var http = require('http');
var jQuery = require('jquery');

var options = {
	host: '127.0.0.1',
	path: '/login',
	port: '5000',
	method: 'POST',
};

var data = {
	username: '18819253726',
	password: '123456'
};

/*var post_url = 'http://127.0.0.1:5000/login';

jQuery.post(post_url, {
            username: '18819253726',
            password: '123456',
        },
        function(data, textStatus, xhr) {
            if (textStatus == "true") { // 登录或注册成功
                console.log(data);
            }
        }
    );*/

data = JSON.stringify(data);
//console.log(data);

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
