$(".circuit-submit").on("click", function (e) {
    var f = $("#send_form").get()[0];
    var form_data = new FormData(f);
    $.ajax({
        url: 'https://google-photos-api.herokuapp.com/photo/upload',
        //url: 'http://localhost:3000/photo/upload',
        method: 'POST',
        data: form_data,
        dataType: 'json',
        processData: false,
        contentType: false,
        beforeSend: function () {
            $('.preloader-background').removeClass('hide');
        },
    })
        .done(function (result) {
            console.log(result);
            var code = $.parseJSON(result.status_code);
            $('.preloader-background').delay(1000).fadeOut('slow');
            $('.preloader-wrapper').delay(1000).fadeOut();
            $(".circuit-submit").removeClass("pulse");

            if (code == 200) {
                M.toast({html: "アップロードに成功しました!"});
                // フォームの内容をクリア
                formClear(f);
            } else {
                M.toast({html: "アップロードに失敗したかも…ごめんね"});
                formClear(f);
            }
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            $('.preloader-background').delay(1000).fadeOut('slow');
            $('.preloader-wrapper').delay(1000).fadeOut();
            M.toast({html: "アップロードに失敗しちゃった…ごめんね"});
        });
});
// フォームの内容をクリアする
function formClear(form) {
    $(form).find("input, select").not(":button, :submit, :reset, :hidden").val("");
}
