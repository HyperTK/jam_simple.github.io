$(".button-submit").on("click", function (e) {
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
            // 属性の付加と削除
            setAttr();

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
            // 属性の付加と削除
            setAttr();
            M.toast({html: "アップロードに失敗しちゃった…ごめんね"});
        });
});
// 組み合わせ作成
function comb() {
    var wall = "";
    var grade = "";
    wall = $('#wall').val();
    grade = $('#grade').val();
    if (wall === "" || grade === "") {
        return "";
    }
    var kind = wall + "-" + grade;
    $('input:hidden[name="kind"]').val(kind);
};
// フォームの内容をクリアする
function formClear(form) {
    $(form).find("input, select").not(":button, :submit, :reset, :hidden").val("").prop("selected", false);
}
// ボタンにパルス付加チェック
function formCheck() {
    var cont = $("#contributor").val();
    var prob = $("#problem").val();
    var wall = $('#wall').val();
    var grade = $('#grade').val();
    var path = $(".file-path").val();
    if(cont !== "" && prob !== "" && wall !== "" && grade !== "" && path !== "") {
        $(".button-submit").addClass("pulse");
    } else {
        $(".button-submit").removeClass("pulse");
    }
}

// 属性の付加と削除
function setAttr() {
    $('.preloader-background').delay(1000).fadeOut('slow');
    $('.preloader-wrapper').delay(1000).fadeOut();
    $('.button-submit').removeClass('pulse');
    $('.preloader-background').addClass('hide');
}