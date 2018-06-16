var mongoose = require('mongoose');
var Film = mongoose.model('Film');

var type = "0";
var film_name = "新木乃伊";
var film_ename = "The Mummy";
var film_classify = "动作,冒险,奇幻";
var film_long = "美国 / 106分钟";
var film_detail = "一位古埃及公主（索菲亚·宝特拉 饰）因以魔法谋朝不遂而被擒，并被扎成为一具木乃伊生生活埋在大漠底下，千年过后一次机缘巧合她得以重回人间，因为曾遭极刑，她怀着满腔怨恨，在复活之后，她决定利用自己可以呼唤沙尘暴的黑暗力量重新打造整个世界，并要重新建立属于自己的王朝……";
var picture_url = "/static/films/images/showing/new_mummy.png";
var video_link = "https://imgcache.qq.com/tencentvideo_v1/playerv3/TPout.swf?max_age=86400&v=20161117&vid=p0354guc26x&auto=0";
var show_date = new Date("2017,6,9");

	var film = new Film({film_name: film_name});
		film.set('type', type);
		film.set('film_ename', film_ename);
		film.set('film_detail', film_detail);
		film.set('picture_url', picture_url);
		film.set('video_link', video_link);
		film.set('show_date', show_date);
		film.save(function(err) {
			if(err) {
				console.log(err);
				//req.session.error = 'error';
				//res.status(404);
				//res.end();
			} else {
				console.log("ok");
				//req.session.msg = 'success';
				//res.status(200).json(data);
				//res.end();
			}
		});