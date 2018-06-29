var serve = "http://39.104.73.169:80/";
var restaurant_id = "123456";
window.onload = function() {
	init();
	buy_food();
	pay();
}

function init() {
	//read_menu_from_server();
	append_row_food();
	append_menu_bar();
	append_column_food();

}

function read_menu_from_server() {
	var json_restaurant_id = JSON.stringify({
		"restaurant_id": restaurant_id
	});
	$.get(serve + "restaurant", json_restaurant_id, function(json) {
		if($.isEmptyObject(json)) {
			//do nothing
		} else {
			var myjson = jQuery.parseJSON(json);
			show_menu_in_page_menu(myjson);
		}
	});
}

function show_menu_in_page_menu(myjson) {
	var menu_types = get_menu_types(myjson);
	show_row_menu(myjson.menu);
	show_menu_types_in_page(menu_types);
	show_menu_by_type(myjson.menu);

}

function get_menu_types(myjson) {
	var menu = myjson.menu;
	var menu_types = [];
	for(var i = 0; i < menu.length; ++i) {
		var isadded = false;
		for(var j = 0; j < menu_types.length; ++j) {
			if(menu[i].food_type == menu_types[j]) isadded = true;
		}
		if(!isadded) {
			menu_types.push(menu[i].food_type);
		}
	}
	return menu_types;
}

function show_menu_types_in_page(menu_types) {
	var menu_bar_html = '<a href="#1" class="food_type"></a>';
	var types = $(".menu_type");
	var i = 0;
	var num = 1;
	types.append(menu_bar_html);
	types.each(function() {
		$(this).find(".food_type").text(menu_types[i++]);
		$(this).find(".food_type").attr("href", "#" + num++);
		//console.log(menu_types[i]);
	});
}

function show_menu_by_type(menu) {
	var j = 0;
	var num = 1;
	var types = $(".food_type");
	var column_food_html = '<div class="food-image"><a class="anchor"></a><img class="food_image" width="100" height="72"></div><div class="food-description"><h4 class="food_name"><b></b></h4><p class="food_description"></p><span class="money">&yen;<b class="menu_price"></b></span><span><button class = "col-minus">-</button><b class="num"></b><button class = "col-plus">+</button></span></div>';
	types.each(function() {
		var is_first_food = true;
		for(var i = 0; i < menu.length; ++i) {
			if($(this).text() == menu[i].food_type) {
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".food_image").attr("src", menu[i].picture_url);
				$(".food_name").text(menu[i].food_name);
				$(".food_description").text(menu[i].food_description);
				$(".menu_price").text(menu[i].food_price);
				if(is_first_food) {
					$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", num++);
					is_first_food = false;
				}
				j++;
			}
		}
	});
}

function show_row_menu(menu) {
	var j = 0;
	var row_food_html = '<img class="row_food_image" width="100" height="72"><p>class="row_food_name"</p><span class = "money">&yen;<b class="row_food_price">12.9</b></span><span class="row_num"></span><button class = "row-plus">+</button>';
	for(var i = 0; i < 6; ++i) {
		$(".js-mui-control-item").eq(j++).append(row_food_html);
		$(".row_food_image").attr("src", menu[i].picture_url);
		$(".row_food_name").text(menu[i].food_name);
		$(".row_food_price").text(menu[i].food_price);

	}
}

function append_row_food() {
	var row_food_html = '<img class="row_food_image" src="image/鹅肠.png" width="100" height="72"><p class="row_food_name">酱爆鹅肠 </p><span class="money">&yen;<b class="row_food_price">12.9</b></span><span class="row_num"></span><button class="row-plus">+</button>';
	for(var i = 0; i < 6; ++i) {
		$(".js-mui-control-item").eq(i).append(row_food_html);
	}
}

function append_column_food() {
	var types = $(".food_type");
	var j = 0;
	var column_food_html = '<div class="food-image"><a class="anchor" name="1"></a><img src="image/鸭翅.png" width="100" height="72"></div><div class="food-description"><h4><b class="food_name">酱香鸭翅</b></h4><p class="food_description">鸭翅全部砍成一块块，方便入味，超级好吃</p><span class="money">&yen;<b class="menu_price">12.9</b></span><span><button class = "col-minus">-</button><b class="num"></b><button class = "col-plus">+</button></span></div>';
	types.each(function() {
		//console.log("abc");
		for(var i = 0; i < 1; ++i) {
			//console.log("abc");
			if($(this).text() == "饭") {
				//console.log("abc");
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", 1);
				//console.log($(".js-mui-control-item2").eq(j).find(".anchor").attr("name"));
				j++;
			}
			if($(this).text() == "荤菜") {
				//console.log("abc");
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", 2);
				//console.log($(".js-mui-control-item2").eq(j).find(".anchor").attr("name"));
				j++;
			}
			if($(this).text() == "素菜") {
				//console.log("abc");
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", 3);
				//console.log($(".js-mui-control-item2").eq(j).find(".anchor").attr("name"));
				j++;
			}
			if($(this).text() == "饮料") {
				//console.log("abc");
				$(".js-mui-control-item2").eq(j).append(column_food_html);
				$(".js-mui-control-item2").eq(j).find(".anchor").attr("name", 4);
				//console.log($(".js-mui-control-item2").eq(j).find(".anchor").attr("name"));
				j++;
			}
		}
	});
}

function append_menu_bar() {
	var num = 1;
	var menu_bar_html = '<a href="#1" class="food_type"></a>';
	var menu_types = new Array("饭", "荤菜", "素菜", "饮料");
	var types = $(".menu_type");
	var i = 0;
	types.append(menu_bar_html);
	types.each(function() {
		$(this).find(".food_type").text(menu_types[i++]);
		$(this).find(".food_type").attr("href", "#" + num++);
		//console.log($(this).find(".food_type").attr('href'));
	});
}

function buy_food() {
	var col_plus_id = 1;
	var row_plus_id = 21;
	var v = new Array(20);
	var w = new Array(10);

	$(".col-plus").click(function() {
		var num = 1;
		var flat = 1;
		//console.log("abc");
		//$(this).parent().find(".col-minus").css("opacity", 1);
		$(this).parent().find(".num").css("opacity", 1);
		for(var j = 1; j < 20; ++j) {
			if($(this).attr('id') == j) {
				//console.log("abc");
				//console.log(i);
				//console.log(v[i]);
				$(this).parent().find(".num").text(++v[j]);
				$(this).parent().find(".col-minus").css("opacity", 1);
				flat = 0;
			}
		}
		if(flat) {
			//console.log("abc");
			$(this).parent().find(".num").text(num);
			$(this).attr("id", col_plus_id);
			v[col_plus_id] = num;
			num++;
			//console.log(v[i]);
			col_plus_id++;
			//console.log($(this).attr('id'));
			$(this).parent().find(".col-minus").css("opacity", 1);

		}
	});
	$(".col-minus").click(function() {
		//console.log("abc");
		var value = $(this).parent().find(".num").text();
		//console.log(value);
		value--;
		$(this).parent().find(".num").text(value);
		for(var j = 1; j < 15; ++j) {
			if($(this).parent().find(".col-plus").attr('id') == j) {
				v[j]--;
				//console.log(v[j]);
			}
		}
		if(value == 0) {
			$(this).css("opacity", 0);
			$(this).parent().find(".num").css("opacity", 0);
		}
	});
	var amount = 0;
	var money = 0;
	$(".col-plus").click(function() {
		$(".food_amount").text(++amount);
		$(".food_amount").css("opacity", 1);
		if(amount) {
			$(".basket-description").text("去结算");
			$(".basket-description").css("background-color", "aquamarine");
		} else {
			$(".basket-description").text("木有菜品");
			$(".basket-description").css("background-color", "#555555");
		}
		//计算菜品总金额；
		money += parseFloat($(this).parent().prev().find(".menu_price").text());
	});

	$(".row-plus").on('tap', function() {
		var row_num = 1;
		var flat = 1;
		//console.log("abc");
		for(var j = 21; j < 30; ++j) {
			if($(this).attr('id') == j) {
				//console.log("abc");
				//console.log(i);
				//console.log(v[i]);
				$(this).prev().text(++v[j]);
				//$(this).parent().find(".col-minus").css("opacity", 1);
				flat = 0;
			}
		}
		if(flat) {
			//console.log("abc");
			$(this).prev().text(row_num);
			$(this).attr("id", row_plus_id);
			v[row_plus_id] = row_num;
			row_num++;
			//console.log(v[i]);
			row_plus_id++;
			//console.log($(this).attr('id'));
			//$(this).parent().find(".col-minus").css("opacity", 1);

		}
	});

	$(".row-plus").on('tap', function() {
		//console.log("abc");
		$(".food_amount").text(++amount);
		$(".food_amount").css("opacity", 1);
		if(amount) {
			$(".basket-description").text("去结算");
			$(".basket-description").css("background-color", "aquamarine");
		} else {
			$(".basket-description").text("木有菜品");
			$(".basket-description").css("background-color", "#555555");
		}
		//计算菜品总金额；
		money += parseFloat($(this).parent().prev().find(".menu_price").text());
	});

	$(".col-minus").click(function() {
		$(".food_amount").text(--amount);
		if(!amount) {
			$(".food_amount").css("opacity", 0);
			$(".basket-description").text("木有菜品");
			$(".basket-description").css("background-color", "#555555");
		} else {
			$(".basket-description").text("去结算");
			$(".basket-description").css("background-color", "aquamarine");
		}
		money -= parseFloat($(this).parent().prev().find(".menu_price").text());
	});
}

//发送订单到服务器
//订单数据；
var table_num;
var order_time;
var menu_name;
var menu_price;
var menu_num;
var menu = new Array();
var total_num;
var total_price;
//var order_num;
var obj;

function pay() {

	$(".basket-description").on('click', function() {
		//alert("您消费金额总共为：" + money);
		sendJson();
		//showOrder();
	});

}

function calculate_order() {
	$(".num").each(function() {
		if($(this).text() != "0") {
			menu_name = $(this).parents(".food-description").find(".food_name").text();
			menu_price = $(this).parent().prev().find(".menu_price").text();
			menu_num = $(this).text();
			total_num += parseInt(menu_num);
			total_price += parseFloat(menu_price) * parseInt(menu_num);
			obj = {
				'menu_name': menu_name,
				'menu_price': menu_price,
				'menu_num': menu_num
			};
			menu.push(obj);
		}
	});
	console.log(total_num);
	console.log(total_price);

	$(".row_num").each(function() {
		if($(this).text() != "0") {
			menu_name = $(this).prev().prev().text();
			menu_price = $(this).prev().find(".row_food_price").text();
			menu_num = $(this).text();
			total_num += parseInt(menu_num);
			total_price += parseFloat(menu_price) * parseInt(menu_num);
			obj = {
				'menu_name': menu_name,
				'menu_price': menu_price,
				'menu_num': menu_num
			};
			menu.push(obj);
		}
	});
}

function getTime() {
	var mydate = new Date();
	/*
		var hour = mydate.getHours();
		var minute = mydate.getMinutes();
		var second = mydate.getSeconds();
		minute = checkTime(minute);
        second = checkTime(second);
		var time = hour + ":" + minute + ":" + second;
		return time;
		*/
	return mydate;
}

function sendJson() {
	//calculate_order();
	//order_time = getTime();
	console.log("abc");
	console.log(total_num);
	console.log(total_price);
	/*
	var request = {
		resturant_id: '213',
		table_num: '11',
		order_time: order_time,
		//menu: menu,
		menu: [{
				'menu_name': encodeURI('螺蛳粉'),
				'price': '13',
				'num': '2'
			},
			{
				'menu_name': encodeURI('过桥米线', 'utf-8'),
				'price': '11',
				'num': '1'
			}
		],
		total_num: '2',
		total_price: '$30'
	};
	*/
	//var encoded = JSON.stringify(request);
	//var jsonStr = encoded;
	var time = new Date();
	var jsonStr = JSON.stringify({
		restaurant_id: '123456',
		table_num: '1',
		order_time: time,
		menu: [{
				'menu_name': encodeURI('螺蛳粉'),
				'price': '13',
				'num': '2'
			},
			{
				'menu_name': encodeURI('过桥米线', 'utf-8'),
				'price': '11',
				'num': '1'
			}
		],
		total_num: '2',
		total_price: '$30'
	});

	/*
	$.getJSON(serve + "order", jsonStr, function(json) {
	    do something;
	});
	*/
	console.log("abc");
	/*
	$.post(serve + "order", jsonStr, function(data) {
		//console.log("abc");
		alert("请求成功");
	});
	*/
	console.log("def");

	$.ajax({
		type: 'POST',
		//url: serve + "order",
		url: "http://39.104.73.169:80/order",
		data: jsonStr,
		//dataType: "json",
		//timeout: 6000,
		//async:false,
		success: function(data) {
			alert("请求成功");
		},
		error: function(data, XMLHttpRequest, textStatus, errorThrown) {
			alert('请求错误');
			alert(data);
			alert(JSON.stringify(data));
			alert(XMLHttpRequest.status);
			alert(XMLHttpRequest.readyState);
			alert(textStatus);
		}
	});

	console.log("def");
}

function showOrder() {
	var j = 0;
	$(".num").each(function() {
		if($(this).text() != "0") {
			var column_food_html = '<img class="order_food_image" width="100" height="72"><h4 class="order_food_name"></h4><span class="order_money">&yen;<b class="order_food_price"></b></span><p class="order_food_num"></p>';
			$(".js-mui-control-item3").eq(j++).append(column_food_html);
			$(".order_food_name").text($(this).parents(".food-description").find(".food_name").text());
			$(".order_food_price").text($(this).parent().prev().find(".menu_price").text());
			$(".order_food_num").text($(this).text());
			$(".order_food_image").attr("src", $(this).parents(".food-description").prev().find(".food_image").attr("src"));
		}
	});
	$(".row_num").each(function() {
		if($(this).text() != "0") {
			var row_food_html = '<img class="order_food_image" width="100" height="72"><h4 class="order_food_name"></h4><span class="order_money">&yen;<b class="order_food_price"></b></span><p class="order_food_num"></p>';
			$(".js-mui-control-item3").eq(j++).append(row_food_html);
			$(".order_food_name").text($(this).prev().prev().text());
			$(".order_food_price").text($(this).prev().find(".row_food_price").text());
			$(".order_food_num").text($(this).text());
			$(".order_food_image").attr("src", $(this).prev().prev().prev().attr("src"));
		}
	});

	$(".order_total_money").text(total_price);
	$(".order_total_num").text(total_num);
}