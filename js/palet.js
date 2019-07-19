// 初期化
$(window).on('load', function () {
    //$('.sizer').hide();
});

// オリジナルをクローンする
// ドラッグ属性を与えて移動可能にする
$(function () {
    // ダブルクリックイベント待機
    $(document).on('dblclick', '.origin', function () {
        // 選択解除
        UnSelect();
        // コピーするためのクラスを取得
        var cls = $(this).attr('class');
        cls = cls + " pointer";

        // IDを連番にする
        var count = $('.pointer').length;
        var point_id = "point_" + String(count);

        // 絶対位置でクローン
        $('#palet').prepend($(this).clone().attr({
            id: point_id,
            class: cls,
        }).css({ position: "absolute" }));

        $('.pointer').draggable({
            "containment": '#palet',
            "opacity": 0.7
        });

    });
    $('.pointer').css({ position: "absolute" }).draggable({
        "containment": '#palet',
        "opacity": 0.7
    });
    // palet内でpointerクラスのオブジェクトを動かせるようにする
    $('#palet').droppable({
        "accept": '.pointer',
        "drop": function (e, ui) {
            ui.draggable.css({ position: "absolute" })
        },
    });
});

// 文字サイズ変更
$(function () {
    // 初期
    $('#rng_1').on('input change', function () {
        // 変動
        $('#score').html($(this).val());
        var size = $(this).val();
        var px = size + "px";
        $('#point_1').css('fontSize', px);
    });
});

// タッチ
$(function () {
    $(document).on('click', '.pointer', function () {
        // 選択解除
        UnSelect();
        // target付加
        $(this).addClass('target');
        // 選択
        Select();
        w = $(this).outerWidth();
        // スライダーの設定
        $('.sizer').val(w);
        $('.rotator').val(0);
        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js");
    });
});

$(function () {
    $(document).on('click', '#canvas', function () {
        // 選択解除
        UnSelect();
    });
});

// マークサイズ変更
$(function () {
    $('.sizer').on('input change', function () {
        // 変動
        var size = $(this).val();
        var c = $('.target').children('img');
        if (c.length > 0) {
            $('.target img').width(size);
            $('.target img').height(size);
        } else {
            // imgなければ
            $('.target').outerWidth(size);
            $('.target').outerHeight(size);
        }

        //var px = size + "px";
        //$('.target').css('fontSize', px);
    });
});

// 要素回転
$(function () {
    $('.rotator').on('input change', function () {
        // 変動
        var rotate = $(this).val();
        $('.target').css('transform', 'rotate(' + rotate + 'deg)');
    });
});

// フォーカスアウト
$(function () {
    $('.target').on('blur', '.pointer', function () {
        // 選択解除
        UnSelect();
    });
})

// オブジェクトを選択状態にする
function Select() {
    // imgを持っていれば
    var c = $('.target').children('img');
    if (c.length > 0) {
        $('.target img').addClass('z-depth-2');
    } else {
        // imgなければ
        $('.target').addClass('z-depth-2');
    }
}
// オブジェクトの選択を解除する
function UnSelect() {
    // imgを持っていれば
    var c = $('.target').children('img');
    if (c.length > 0) {
        $('.target img').removeClass('z-depth-2');
    } else {
        // imgなければ
        $('.target').removeClass('z-depth-2');
    }
    $('.target').removeClass('target');
}