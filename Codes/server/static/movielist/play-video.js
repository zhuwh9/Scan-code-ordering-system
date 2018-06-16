function play_video() {
    $(".play").each(function (index, button) {
        $(button).click(function (event) {
            $("#play-video").css('visibility', 'visible');
            $("body").css({
                'height': '100vh',
                'overflow-y': 'hidden',
                'overflow-x': 'scroll'
            });
            $("#play-video p").after("<embed src='" + $(button).siblings(".video-url").html() + "' allowFullScreen='true' quality='high' align='middle' allowScriptAccess='always' type='application/x-shockwave-flash'></embed>");
        });
    });
    $("#play-video > p").click(function (event) {
        $("#play-video").css('visibility', 'hidden');
        $("#play-video embed").remove();
        $("body").css("height", "auto");
        $("body").css("overflow", "unset");
    });
}
