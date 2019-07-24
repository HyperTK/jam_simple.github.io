var file = $("#file").get(0);
var canvas = $("#canvas").get(0);
var target = $("#target").get(0);
var download = $("#download").get(0);
var edit = $("#edit").get(0);
var editEnd = $("#confirm").get(0);

var canvasWidth = 400;
var canvasHeight = 300;
var uploadImgSrc;

// canvasの準備
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var ctx = canvas.getContext('2d');

// ファイルが指定された時にloadLocalImage()を実行
file.addEventListener("change", loadLocalImage, false);
download.addEventListener("click", imgDownload, false);

function loadLocalImage(e) {
    // ファイルの情報を取得
    var fileData = e.target.files[0];

    // 画像ファイル以外は処理を止める
    if (!fileData.type.match("image.*")) {
        alert("画像を選択してください！");
        return;
    }

    // FileReaderオブジェクトを使ってファイル読み込み
    var reader = new FileReader();
    reader.onload = function () {
        // canvas上に表示する
        uploadImgSrc = reader.result;
        canvasDraw();
    }
    // ファイル読み込みを実行
    reader.readAsDataURL(fileData);
}

// canvas上に画像を表示する
function canvasDraw() {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    // canvas上に画像を表示
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = uploadImgSrc;
    img.onload = function () {
        result = { width: img.naturalWidth, height: img.naturalHeight };
        canvas.width = result.width;
        canvas.height = result.height;
        ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, result.width, result.height);
        $(".download").removeClass("hide");
    }
}

// 画像ダウンロード
function imgDownload() {
    var pointer = $(".pointer");
    var imgs = [];
    for(var i = 0; i < pointer.length; i++) {
        var child = pointer[i].children[0];
        imgs[i] = child.src;
    }
    preloadImages(imgs).done(function() {
        // canvasの中身をコピー
        var copy = ctx.getImageData(0, 0, canvas.width, canvas.height);
        // canvasのサイズをtargetにも指定
        target.width = canvas.width;
        target.height = canvas.height;
        var context = target.getContext("2d");
        context.putImageData(copy, 0, 0);

        for(var i = 0, l = imgs.length; i < l; i++) {
            var img = new Image();
            img.crossOrigin = 'Anonymous';
            img.src = imgs[i];
            var pointer = $(".pointer");
            var h = pointer[i].clientHeight;
            var w = pointer[i].clientWidth;
            var x = pointer[i].offsetLeft;
            var y = pointer[i].offsetTop;

            var rect = $("#target").offset();
            ctx.drawImage(img, x, y, 50, 50, 0, 0, 50, 50);
        }
        var c = $("#target").get(0);
        // 画像として出力
        var outputImg = document.createElement('img');
        outputImg.src = c.toDataURL("image/png");
        document.getElementById('result').appendChild(outputImg);
    });
    let link = document.createElement("a");
    //link.href = c.toDataURL("image/png");
    //link.download = getTimestamp();
    //link.click();
}

// 画像をプリロードする
var preloadImages = function (srcs) {
    if (!srcs.length) {
        return;
    }
    var dfd = $.Deferred();
    var imgs = [];
    for (var i = 0, l = srcs.length; i < l; i++) {
        var img = new Image();
        img.crossOrigin = 'Anonymous';
        img.src = srcs[i];
        imgs.push(img);
    }
    var check = function () {
        for (var i = 0, l = imgs.length; i < l; i++) {
            if (imgs[i].complete !== true) {
                setTimeout(check, 250);
                return false;
            }
        }
        dfd.resolve(imgs);
    };
    check();
    return dfd.promise();
}

// 日時を作成
function getTimestamp() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    var min = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
    var sec = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
    return year + '-' + month + '-' + day + '-' + hour + '-' + min + '-' + sec;
}