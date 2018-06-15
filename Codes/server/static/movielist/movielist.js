window.onload = function () {
    login_register_part();
    function toLi(jsonObj) {
        return '<li style="background-image: url('+ jsonObj.picture_url +');">' +
            '<div class="video" style="background-image: url('+ jsonObj.picture_url +')">' +
            '<button class="play"></button>' +
            '<button class="check-pocket">查询订票</button>' +
            '<button class="detail">查看详情</button>' +
            '<span class="video-url" hidden>'+ jsonObj.video_link +'</span>' +
            '</div>' +
            '<div class="message">' +
            '<p class="name">'+ jsonObj.film_name +'</p>' +
            '<p class="score">'+ jsonObj.score +'/10</p>' +
            '<p class="introduce">简介：<span>'+ jsonObj.film_detail +'</span></p>' +
            '<p class="simple-message">'+ jsonObj.film_type +'|'+ jsonObj.film_classify +'</p>' +
            '<p class="director">上映时间：<span>'+ jsonObj.show_date +'</span></p>' +
            '<p class="actors">时长：<span>'+ jsonObj.film_long +'</span></p>' +
            '</div>' +
            '</li>';
    }


    $.get("/getList", function (data, textStatus) {
        if (textStatus === "success") {
            var movies = data.filmlist;
            movies.forEach(function (el) {
                $("body ul").append(toLi(el));
            });
            play_video();
        }
    });
};
