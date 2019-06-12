document.addEventListener('DOMContentLoaded', function () {
    var script = $('<script>').attr({
        'type': 'text/javascript',
        'src': "https://cdn.jsdelivr.net/npm/slick-carousel-latest@1.9.0/slick/slick.min.js"
    });
    $('body')[0].appendChild(script[0]);
    $('body').on('click', 'a[data-btn-type=ajax]', function (e) {
        var send_data = comb();
        $.ajax({
            url: 'https://google-photos-api.herokuapp.com/get_photos/' + send_data,
            method: 'POST',
            beforeSend: function () {
                $('.loading').removeClass('hide');
            },
        })
            .done((response) => {
                console.log(response);
                $('.loading').addClass('hide');
                if (response === "" || response === undefined || response == null || response == '""') {
                    $('div[data-result=""]').html("まだ課題がありません(*´ڡ`●)");
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
                $('div[data-result=""]').html("データが見つかりませんでした！<br>もう一度お試しくださいm(_ _)m");
                $('.loading').addClass('hide');
            });
    });
    var wall = "";
    var grade = "";
    // 組み合わせ作成
    function comb() {
        wall = $('#wall').val();
        grade = $('#grade').val();
        if (wall === "" || grade === "") {
            return "";
        }
        return wall + "-" + grade;
    };
    // slick用のURL表記に変換する
    function make_slick_form(res) {
        var arr = JSON.parse(res);
        var count = Object.keys(arr["photos"]).length;
        var tag = "";
        for (var i = 0; i < count; i++) {
            img = "img" + ((i + 1).toString());
            problem = "課題名:" + arr["photos"][img].problem + " ";
            name = "投稿者:" + arr["photos"][img].contributor;
            tag += "<p>" + problem + name + "<br>" + "<img src=" + "\"" + arr["photos"][img].url + "\"" + "/></p>";
        }
        return tag;
    }
});