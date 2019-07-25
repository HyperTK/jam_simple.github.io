document.addEventListener('DOMContentLoaded', function () {
    $(".button-submit").on("click", function (e) {
        var f = $("#send_form").get()[0];
        var form_data = new FormData(f);
        $.ajax({
            url: 'https://google-photos-api.herokuapp.com/photo/problems_count',
            method: 'GET',
            data: $('#kind').val(),
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('.loading').removeClass('hide');
            },
        })
            .done(function (result) {
                console.log(result);
                $('.loading').addClass('hide');
                if (result === null || result === "") {
                    $('div[data-list=""]').html("何らかの理由で失敗したっす><…もう一度お試しくださいm(_ _)m ");
                }
                $('div[data-list=""]').html(result);
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $('.loading').addClass('hide');
                $('div[data-list=""]').html("一覧の取得に失敗しました！<br>もう一度お試しくださいm(_ _)m");
            });
    });
    // サーキット課題一覧取得
    $(".button-list").on("click", function (e) {
        var f = $("#send_form").get()[0];
        var form_data = new FormData(f);
        $.ajax({
            //url: 'http://localhost:3000/photo/problems_list',
            url: 'https://google-photos-api.herokuapp.com/photo/problems_list',
            method: 'GET',
            data: $('#kind').val(),
            processData: false,
            contentType: false,
            beforeSend: function () {
                $('.loading').removeClass('hide');
            },
        })
            .done(function (result) {
                console.log(result);
                $('.loading').addClass('hide');
                if (result === null || result === "") {
                    $('div[data-list=""]').html("何らかの理由で失敗したっす><…もう一度お試しくださいm(_ _)m ");
                }
                $('div[data-list=""]').html(result);
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                $('.loading').addClass('hide');
                $('div[data-list=""]').html("一覧の取得に失敗しました！<br>もう一度お試しくださいm(_ _)m");
            });
    });
});