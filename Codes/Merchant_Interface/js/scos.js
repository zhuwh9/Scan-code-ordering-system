var server="http://192.168.43.233:5000/";
var restaurant_id="123456";
mui.ready(function(){
   mui(".mui-bar-tab").on('tap','.mui-tab-item',function(){
      //点击tabBar的时候找到所有的div进行隐藏
      $('.tab-div').css({"display":"none"});
      //匹配div的下标跟点击的下表相同就进行显示
      $('.tab-div').eq($(this).index()).css({"display":"block"});
       })
   })

window.addEventListener("confirm_create_menu",function(event) {
	var menu=event.detail;
	create_menu_in_server(menu);
	create_menu_in_client(menu);
	mui(".menu-switch").switch();
	menu_bind_delete();
})

function create_menu_in_server(menu) {
	var json_menu=JSON.stringify(menu);

	$.post(server+'addFood',json_menu,function(data, status){
		mui.toast("创建菜单成功");
	})
}

function create_menu_in_client(menu) {
	var menu_type=menu.food_type;
	var menu_name=menu.food_name;
	var menu_html='<div class="detailed-menu"><span class="detailed-menu-name"></span><span class="mui-switch mui-active menu-switch"><span class="mui-switch-handle"></span></span><hr /></div>'
	var type_node=$('.menu-type').filter(function() {
		return this.innerHTML==menu_type;
	})
	
	var content_node=$(type_node).next();
	content_node.append(menu_html);
	content_node.find(".detailed-menu-name").last().text(menu_name);
}

window.onload=function() {
	init();
	listen_orders_from_server();
	activate_accept_order();
	activate_refuse_order();
	
	menu_bind_delete();
	menu_bind_create();
	menu_type_bind_create();
	menu_type_bind_delete();
}

function init() {
	read_menu_from_server();
	read_orders_from_server();
}

function read_menu_from_server() {
	$.getJSON(server+'', function(json_menus) {
		var menus=JSON.parse(json_menus);
		if ($.isEmptyObject(menus)) {
			toast("菜单为空")
		} else {
			show_menu_in_page_menu(menus)
		}
	});
}

function show_menu_in_page_menu(menus) {
	var menu_types=get_menu_types(menus);
	show_menu_types_in_page(menu_types);
	var i=0;
	for (i=0; i < menus.menu.length; ++i) {
		create_menu_in_client(menus.menu[i]);
	}
}

function get_menu_types(menus) {
	var menu=menus.menu;
	var menu_types=[];
	for (var i=0;i<menu.length;++i) {
		var isadded=false;
		for (var j=0;j<menu_types.length;++j) {
			if (menu[i].food_type==menu_types[j]) isadded=true;
		}
		if (!isadded) {
			menu_types.push(menu[i].food_type);
		}
	}
	return menu_types;
}

function show_menu_types_in_page(menu_types) {
	var menu_type_html='<ul class="mui-table-view"><span class="mui-switch mui-switch-blue mui-active type-switch"><span class="mui-switch-handle"></span></span> <li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right menu-type" href="#">面食</a><div class="mui-collapse-content"><button type="button" class="mui-btn mui-btn-success">添加菜品</button></div></li></ul>';
	for (var i=0;i<menu_types.length;++i) {
		//$(".manage-store").append(menu_type_html);
		//$(".manage-store").find(".menu_type").text(menu_types[i]);
		
		$(".create-type").before(menu_type_html);
		$(".create-type").prev().find(".menu-type").text(menu_types[i]);
	}
}

function read_orders_from_server() {
	var json_restaurant_id=JSON.stringify({"restaurant_id":restaurant_id});
	$.post(server+'receiveAllOrders',json_restaurant_id,function(data, status){
		mui.toast("读取订单成功");
		alert(data['data'].length);
		show_orders_in_page_history(data['data']);
	})
}

function show_orders_in_page_history(orders) {
	//var order_num=orders.order_num, table_num=orders.table_num, order_time=orders.order_time, menu=orders.menu, table_num=orders.table_num, total_price=orders.total_price;
	var order_html='<div class="order"><h1 class="order-title"><span class="table-num"> 7</span><span>号桌 </span><span class="order-state">已下单</span></h1><h3>订单号：<span class="order-seq-num"></span></h3><h3>下单时间：<span class="order-time"></span></h3><hr /><div class="order-content"><h2 class="menu-total"> <span>共</span><span class="total-num">3</span><span>件商品，实付￥</span><span class="total-price"></span></h2><h2><button class="accept-order">确认</button></h2></div><hr /></div>';
	var menu_line='<h2 class="menu-line"><span class="menu-name"></span><span class="menu-price">￥13</span><span class="menu-num">x 2</span></h2>';	
	var j=0;
	for (j=0; j < orders.length;++j) {
		var order_num=orders[j].order_num,table_num=orders[j].table_num, order_time=orders[j].order_time, menu=orders[j].menu, total_num=orders[j].total_num, total_price=orders[j].total_price;
		$(".history").append(order_html);
		var order=$(".history .order").last();
		order.filter(".order-num").text(order_num);
		order.filter(".order-time").text(order_time);
		order.filter(".table-num").text(table_num);
		order.filter(".order-seq-num").text(order_num);
		order.filter(".total-num").text(total_num);
		order.filter(".total-price").text(total_num);
		
		var order_content=order.find(".order-content");
		for (var i=0;i<menu.length;++i) {
			order_content.prepend(menu_line);
			var menu_inserted=order_content.children()[0];
			$(menu_inserted).filter(".menu-name").text(menu[i].food_name);
			$(menu_inserted).filter(".menu-price").text("￥"+menu[i].food_price);
			$(menu_inserted).filter(".menu-num").text("x "+menu[i].food_num);
		}
	}
}

function menu_bind_delete() {
	var menu_switchs = $(".menu-switch");
	var i=0;
	for (i=0; i < menu_switchs.length; ++i) {
		menu_switchs[i].addEventListener("toggle", function() {
			var that=this;
			if (event.detail.isActive) {
				//do something
			}else {
				mui.confirm("确认删除该菜品吗？","提醒",["否","是"],function(e) {
					if (e.index==1) {
						delete_menu_from_page(that.parentNode);
						delete_menu_in_server($(that).prev().text());
						mui.toast("删除成功");
					}else{
					mui.toast("取消删除");
					}
				});
			}
		});
	}
}

function delete_menu_from_page(menu) {
	$(menu).remove();
}

function delete_menu_in_server(name) {
	var json_menu_name=JSON.stringify({"restaurant_id":"test_restraurant","food_name":name})
	$.post(server+'deleteFood', json_menu_name ,function(result) {
		mui.toast("从后台删除成功");
	});
}

function menu_bind_create() {
	//mui('.bottomPopover').popover('show', $("manage-store")[0]);
	var create_menu_buttons=$(".mui-collapse-content button");
	var i;
	for (i=0;i<create_menu_buttons.length;++i) {
		create_menu_buttons[i].addEventListener("tap",function () {
			var that = this;
			var type=$(that.parentNode.parentNode).find(".menu-type")[0].innerHTML;
			//mui('.mui-popover').popover('toggle');
			mui.openWindow({
		    url:"create_menu.html",
		    id:"create_menu.html",
		    styles:{
		      //top:0,//新页面顶部位置
		      //bottom:100px,//新页面底部位置
		      //width:100%,//新页面宽度，默认为100%
		      //height:100%,//新页面高度，默认为100%
		      
		    },
		    extras:{
		      //.....//自定义扩展参数，可以用来处理页面间传值
		      menu_type:type
		    },
		    createNew:false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		    show:{
		      autoShow:true,//页面loaded事件发生后自动显示，默认为true
		      aniShow:'slide-in-right',//页面显示动画，默认为”slide-in-right“；
		      //duration:animationTime//页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
		    },
		    waiting:{
		      autoShow:true,//自动显示等待框，默认为true
		      title:'正在加载...',//等待对话框上显示的提示内容
		      options:{
		        //width:waiting-dialog-widht,//等待框背景区域宽度，默认根据内容自动计算合适宽度
		        //height:waiting-dialog-height,//等待框背景区域高度，默认根据内容自动计算合适高度
		        
		      }
		    }
		})
			
		});
	}
}

function menu_type_bind_create() {
	$(".create-type")[0].addEventListener("tap",function () {
		mui.prompt("请输入新的类别名字","类别名字","创建类别",["确定","取消"],function(e) {
					if (e.index==1) {
						mui.toast("取消创建");
						this.switch().toggle();
					}else{
						create_type(e.value)
					}
				})
	})
}

function menu_type_bind_delete() {
	var type_switchs = $(".type-switch");
	var i=0;
	for (i=0; i < type_switchs.length; ++i) {
		type_switchs[i].addEventListener("toggle", function() {
			var that=this;
			if (event.detail.isActive) {
				//do something
			}else {
				mui.confirm("确认删除该类别吗？","提醒",["否","是"],function(e) {
					if (e.index==1) {
						delete_menu_from_page(that.parentNode);
						delete_menu_in_server($(that).prev().text());
						mui.toast("删除成功");
					}else{
					mui.toast("取消删除");
					}
				});
			}
		});
	}
}

function create_type(type_name) {
	var menu_type_html='<ul class="mui-table-view"><span class="mui-switch mui-switch-blue mui-active type-switch"><span class="mui-switch-handle"></span></span> <li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right menu-type" href="#">面食</a><div class="mui-collapse-content"><button type="button" class="mui-btn mui-btn-success">添加菜品</button><hr /></div></li></ul>';
	$(".create-type").before(menu_type_html);
	$(".create-type").prev().find(".menu-type").text(type_name);
	menu_bind_create();
	mui(".type-switch").switch();
	menu_type_bind_delete();
}
function show_menu_by_type(menu) {
	var types=$(".menu-type");
	var content=$(".mui-collapse-content");
	var detailed_menu_html='<div class="detailed-menu"><span class="detailed-menu-name"></span><span class="mui-switch mui-active"><span class="mui-switch-handle"></span></span></div>';
	for (var i=0; i < menu.length;++i) {
		if (types[i].text()==menu[i].menu_type) {
			content[i].append(detailed_menu_html);
			content[i].lastChild().find(".detailed-menu-name").text(menu[i].menu_name);
		}
	}
}

function listen_orders_from_server() {
	var interval=10;
	window.setInterval(get_orders,1000*interval);
}
function get_orders() {
	$.post(server+'receiveOrder', function(json_orders) {
		var orders=JSON.parse(json_orders);
		if ($.isEmptyObject(orders)) {
			//do nothing
		} else {
			show_order_in_page_new_order(orders)
		}
	});
}

function show_order_in_page_new_order(orders) {
	var order_num=orders.order_num, table_num=orders.table_num, order_time=orders.order_time, menu=orders.menu, table_num=orders.table_num, total_price=orders.total_price;
	menu=JSON.parse(menu);
	var order_html='<div class="order"><h1 class="order-title"><span class="table-num"> 7</span><span>号桌 </span><span class="order-state">已下单</span></h1><h3>订单号：<span class="order-seq-num"></span></h3><h3>下单时间：<span class="order-time"></span></h3><hr /><div class="order-content"><h2 class="menu-total"> <span>共</span><span class="total-num">3</span><span>件商品，实付￥</span><span class="total-price"></span></h2><h2><button class="accept-order">确认</button></h2></div><hr /></div>';
	var menu_line='<h2 class="menu-line"><span class="menu-name"></span><span class="menu-price">￥13</span><span class="menu-num">x 2</span></h2>';	
	$(".new-order").prepend(order_html);
	var order=$(".new-order").firstChild();
	order.filter(".order-num").text(order_num);
	order.filter(".order-time").text(order_time);
	order.filter(".table-num").text(table_num);
	order.filter(".order-seq-num").text(order_num);
	order.filter(".total-num").text(total_num);
	order.filter(".total-price").text(total_num);
	
	var order_content=order.find(".order-content");
	for (var i=0;i<menu.length;++i) {
		order_content.prepend(menu_line);
		var menu_inserted=order_content.firstChild();
		menu_inserted.filter(".menu-name").text(menu[i].food_name);
		menu_inserted.filter(".menu-price").text("￥"+menu[i].food_price);
		menu_inserted.filter(".menu-num").text("x "+menu[i].food_num);
	}
}

function activate_accept_order() {
	var accept_button=$(".order .accept-order");
	var i=0;
	for (i=0; i < accept_button.length;i++) {
		accept_button[i].addEventListener("tap",function () {
			//submit_order_to_server(this);
			move_order_to_dealed_list(this);
		});
	}
}


function submit_order_to_server(button) {
	var order_dictionary=extract_order_infomation(button);
	$.post("url", order_dictionary,function(data, status){
		alert("Data: " + data + "\nStatus: " + status);
	})
}

function extract_order_infomation(button) {
	var order_dictionary=new Object();
	var order = button.parentNode.parentNode.parentNode;
	var order_information=$(order).find(".span");
	order_dictionary["table_num"]=order_information.filter(".table-num").text();
	order_dictionary["order_state"]=order_information.filter(".order-state").text();
	order_dictionary["order_seq_num"]=order_information.filter(".order-seq-num").text();
	var menus=$(order).find(".menu-line");
	
	order_dictionary["total_num"]=order_information.filter(".total-num").text();
	order_dictionary["total_price"]=order_information.filter(".total-price").text();
	return order_dictionary;
}

function move_order_to_dealed_list(button) {
	var order = button.parentNode.parentNode.parentNode;
	var finished_order=$(".finished-order");
	finished_order.prepend(order);
}

function activate_refuse_order() {
	var refuse_button=$(".order .refuse-order");
	var i=0;
	for (i=0;i < refuse_button.length;i++) {
		refuse_button[i].addEventListener("tap",function () {
			alert("refuse");
		});
	}
}