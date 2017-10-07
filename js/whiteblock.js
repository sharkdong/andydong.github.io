/**
 * Created by Andy on 2017/10/6.
 */
(function () {
    var ctx;
    var canvas;
    var blocks;
    var blockWidth;
    var score = 0;
    var tempScore = 0;
    var vy = 3;

    function browserRedirect() {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
            return 'phone';
        } else {
            return 'pc';
        }
    }

    if (browserRedirect() == 'pc') {
        var div = document.getElementById('container');
        var son = document.getElementById('play-content');
        div.removeChild(son);
        var appd = document.createElement('h2');
        appd.style.textAlign = 'center';
        appd.style.color = 'red';
        appd.innerHTML = '请使用移动设备(手机浏览器或微信)打开，谢谢配合！';
        div.appendChild(appd);
    } else {
        window.onload = function () {
            startCanvas();
        }
    }

    //开始绘图
    function startCanvas() {
        canvas = document.getElementById('myCanvas');
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
        ctx = canvas.getContext('2d');
        blocks = [[[0, 0, 'white'], [0, 0, 'white'], [0, 0, 'white'], [0, 0, 'white'], [0, 0, 'white'], [0, 0, 'white']]];
        blockWidth = canvas.width / blocks[0].length;
        setInterval(function () {
            if(score) {
                if(score%10 == 0 && tempScore != score) {
                    tempScore = score;
                    vy = vy + 1;
                }
            }
            startDraw(ctx, blockWidth);
        }, 35);
    }

    //清除画布
    function clearDraw() {
        var canvas = document.getElementById('myCanvas');
        canvas.width = document.documentElement.clientWidth;
        canvas.height = document.documentElement.clientHeight;
        ctx = canvas.getContext('2d');
    }

    function startDraw(ctx, blockWidth) {
        clearDraw();
        var temVy = vy;
        for (var j = 0, jlength = blocks.length; j < jlength; j++) {
            for (var i = 0, length = blocks[j].length; i < length; i++) {
                var startDrawX = i * blockWidth;
                blocks[j][i][1] = blocks[j][i][1] + temVy;
                drawBlocks(ctx, blockWidth, startDrawX, blocks[j][i][1], blocks[j][i][2]);
            }
        }
        if (blocks[blocks.length - 1][0][1] >= 0) {
            var tempBlock = [[0, -blockWidth+ temVy], [0, -blockWidth+ temVy], [0, -blockWidth+ temVy], [0, -blockWidth+ temVy], [0, -blockWidth+ temVy], [0, -blockWidth+ temVy]];
            for (var i = 0, length = tempBlock.length; i < length; i++) {
                var tempColor = 'white';
                if ((Math.floor(Math.random() * 100) % 4) == 3) {
                    tempColor = 'black';
                }
                tempBlock[i].push(tempColor);
            }
            blocks.push(tempBlock);
        }
        if (blocks[0][0][1] > canvas.height) {
            if (blocks[0]) {
                for (var i = 0, alength = blocks[0].length; i < alength; i++) {
                    if (blocks[0][i][2] == 'black') {
                        playFail(2);
                        return false;
                    }
                }
            }
            blocks.splice(0, 1);
        }
    }

    //画方块
    function drawBlocks(ctx, width, x, y, color) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + width, y);
        ctx.lineTo(x + width, y + width);
        ctx.lineTo(x, y + width);
        ctx.lineTo(x, y);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    }

    function playFail(ret) {
        if(ret == 1) {
            alert('不好意思，失败了，踩到白色的了！！！您的分数为：' + score);
        } else if(ret == 2) {
            alert('晕死！有漏掉的！！！大兄弟。您的分数为：' + score);
        }
        score = 0;
        vy = 5;
        startCanvas();
    }

    //手触摸离开事件
    document.getElementById('container').addEventListener('touchend', function (e) {
        touchX = e.changedTouches[0].pageX;
        touchY = e.changedTouches[0].pageY;
        for (var i = 0, leng = blocks.length; i < leng; i++) {
            for (var j = 0, jlength = blocks[i].length; j < jlength; j++) {
                if (touchX > j * blockWidth && touchX < (j + 1) * blockWidth && touchY > blocks[i][j][1] && touchY < (blocks[i][j][1] + blockWidth)) {
                    if (blocks[i][j][2] == 'black') {
                        blocks[i][j][2] = 'green';
                        ++score;
                    } else if (blocks[i][j][2] == 'white') {
                        blocks[i][j][2] = 'red';
                        playFail(1);
                        return false;
                    }
                }
            }
        }

    }, false);

    //禁止微信下拉更新
    document.getElementById('container').addEventListener('touchmove', function (e) {
        e.preventDefault();
    });

})()