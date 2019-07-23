// スクロールを無効にする
$("#palet").on('touchmove.noScroll', function(e) {
    e.preventDefault();
});

var objClone = function(e, obj){
    // ビューポートの変更(ズーム)を防止
    e.preventDefault();
    tapCount = 0;

    // 選択解除
    UnSelect();
    // コピーするためのクラスを取得
    var cls = obj.attr('class');
    cls = cls + " pointer";

    // IDを連番にする
    var count = $('.pointer').length;
    var point_id = "point_" + String(count);

    // 絶対位置でクローン
    $('#palet').prepend(obj.clone().attr({
        id: point_id,
        class: cls,
    }).css({ position: "absolute" }));

    $('.pointer').draggable({
        "containment": '#palet',
        "opacity": 0.7
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
    // 移動イベントセット
    setMoveEvent();
}


// クローンの処理
var mobileCloneObj = function(){
    var target = $(".origin");
    var tapCount = 0;

    for (let i = 0; i < target.length; i++) {
        target[i].addEventListener("touchstart", function (e) {
            if (!tapCount) {
                ++tapCount;
                setTimeout(function () {
                    tapCount = 0;
                }, 350);
            // ダブルタップ判定
            } else {
                objClone(e, $(this));
                // クローンされたオブジェクトに対して
                var pointer = $(".pointer");
                for(let k = 0; k < pointer.length; k++) {
                    pointer[k].addEventListener("touchstart", function(e) {
                        if (!tapCount) {
                            ++tapCount;
                            setTimeout(function () {
                                tapCount = 0;
                            }, 350);
                        // ダブルタップ判定
                        } else {
                            objClone(e, $(this));
                        }
                    });
                }
            }
        });
    }
}

// スマホ用ダブルタップ判定
$(function () {
    mobileCloneObj();
});

// モバイル用の移動イベント設定
var setMoveEvent = function() {
    var target = $(".pointer");
    var del = $(".delete");

    for(let i = 0; i < target.length; i++) {
        target[i].addEventListener("touchmove", function(e){
            var touchLocation = e.targetTouches[0];
            var canvas = $("#canvas").get(0);

            if((touchLocation.pageX >= 0 && touchLocation.pageX <= canvas.offsetWidth - (target[i].clientWidth / 2))
            && (touchLocation.pageY >= canvas.offsetTop && touchLocation.pageY <= del[0].offsetHeight + del[0].offsetTop - target[i].clientHeight)) {
                target[i].style.left = touchLocation.pageX + "px";
                target[i].style.top = touchLocation.pageY + "px";
                // 消去エリアのカラーリング
                if(touchLocation.pageY >= del[0].offsetTop) {
                    del.css("background-color", "#ff8989");
                }else {
                    del.css("background-color", "#F4F5F7");
                }
            }else{
                var max = touchLocation.pageX + target[i].width;
                var width = canvas.offsetWidth;
            }
        });
    }

    for(let i = 0; i < target.length; i++) {
        // ドロップ
        target[i].addEventListener("touchend", function(e){
            var x = parseInt(target[i].style.left); 
            var y = parseInt(target[i].style.top);
            if(y >= del[0].offsetTop) {
                target[i].remove();
                del.css("background-color", "#F4F5F7");
            }
            
        });
    }
}

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