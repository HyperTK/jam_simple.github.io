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
                $('.preloader-background').removeClass('hide');
            },
        })
            .done(function (result) {
                console.log(result);
                setAttr();
                if (result === null || result === "") {
                    M.toast({html: "何らかの理由で失敗したっす>< "});
                }
                M.toast({html: "取得成功"});
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                setAttr();
                M.toast({html: "何らかの理由で失敗したっす>< "});
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
                $('.preloader-background').removeClass('hide');
            },
        })
            .done(function (result) {
                console.log(result);
                setAttr();
                if (result === null || result === "") {
                    M.toast({html: "何らかの理由で失敗したっす><"});
                }
                M.toast({html: "取得成功"});
            })
            .fail((jqXHR, textStatus, errorThrown) => {
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
                setAttr();
                M.toast({html: "何らかの理由で失敗したっす><"});
            });
    });
});

// 属性の付加と削除
function setAttr() {
    $('.preloader-background').delay(1000).fadeOut('slow');
    $('.preloader-wrapper').delay(1000).fadeOut();
    $('.preloader-background').addClass('hide');
}