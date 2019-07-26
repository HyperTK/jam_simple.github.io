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
            $('.loading').removeClass('hide');
        },
    })
        .done(function (result) {
            console.log(result);
            $('.loading').addClass('hide');
            var code = $.parseJSON(result.status_code);
            if (code == 200) {
                //$('div[data-result=""]').html("アップロードに成功しました。投稿ありがとうございますヽ(´ー｀)ノ");
                M.toast({html: "アップロードに成功しました!"});
                // フォームの内容をクリア
                formClear(f);
            } else {
                M.toast({html: "アップロードに失敗したかも…ごめんね"});
                //$('div[data-result=""]').html("もしかするとアップロードに失敗したかもしれません…もう一度お試しくださいm(_ _)m ");
                formClear(f);
            }
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
            $('.loading').addClass('hide');
            $('div[data-result=""]').html("写真のアップロードに失敗しました！<br>もう一度お試しくださいm(_ _)m");
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
    $('input:hidden[name="kind"]').val(kind).prop("selected", false);
};
// フォームの内容をクリアする
function formClear(form) {
    $(form).find("input, select").not(":button, :submit, :reset, :hidden").val("");
}