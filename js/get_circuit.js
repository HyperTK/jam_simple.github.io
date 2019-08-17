document.addEventListener('DOMContentLoaded', function () {
    var script = $('<script>').attr({
        'type': 'text/javascript',
        'src': "https://cdn.jsdelivr.net/npm/slick-carousel-latest@1.9.0/slick/slick.min.js"
    });
    $('body')[0].appendChild(script[0]);
    $('body').on('click', 'a[data-btn-type=ajax-circuit]', function (e) {
        $.ajax({
            url: 'https://google-photos-api.herokuapp.com/get_photos/' + "circuit",
            method: 'POST',
            beforeSend: function () {
                $('.preloader-background').removeClass('hide');
            },
        })
            .done((response) => {
                console.log(response);
                setAttr();
                if (response === "" || response === undefined || response == null || response == '""') {
                    M.toast({html: "まだ課題がありません(*´ڡ`●)"});
                    return false;
                }
                var result = make_slick_form(response);
                $('.sl-photos').removeClass('slick-initialized slick-slider slick-dotted')
                $('div[data-result=""]').html(result);
                $('.sl-photos').slick({
                    arrows: false,
                    accessibility: false,
                    dots: true,
                });
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.log(XMLHttpRequest);
                console.log(textStatus);
                console.log(errorThrown);
                setAttr();
                M.toast({html: "データが見つかりませんでした！"});
            });
    });
    // slick用のURL表記に変換する
    function make_slick_form(res) {
        var arr = JSON.parse(res);
        var count = Object.keys(arr["photos"]).length;
        var tag = "";
        for (var i = 0; i < count; i++) {
            img = "img" + ((i + 1).toString());
            name = "No." + arr["photos"][img].contributor + " ";
            problem = "課題名:" + arr["photos"][img].problem;
            tag += "<p>" + name + problem + "<br>" + "<img src=" + "\"" + arr["photos"][img].url + "\"" + "/></p>";
        }
        return tag;
    }
});

// 属性の付加と削除
function setAttr() {
    $('.preloader-background').delay(1000).fadeOut('slow');
    $('.preloader-wrapper').delay(1000).fadeOut();
    $('.preloader-background').addClass('hide');
}