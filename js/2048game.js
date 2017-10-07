/**
 * Created by Andy on 2017/10/7.
 */

(function () {
    let screenWidth;
    let screenHeight;
    let canvas;
    let ctx;

    //设备检查
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

    //设备判断
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
            screenWidth = document.documentElement.clientWidth;
            screenHeight = document.documentElement.clientHeight;
            startCanvas();
        }
    }
    
    function startCanvas() {
        initCanvas();
        initLayout();


    }

    //布局
    function initLayout() {
        //初始化 头部画布


        //初始化游戏画布
    }

    //初始化画布
    function initCanvas() {
        canvas = document.getElementById('myCanvas');
        canvas.width = screenWidth;
        canvas.height = screenHeight;
        ctx = canvas.getContext('2d');
    }

    //禁止微信下拉更新
    document.getElementById('container').addEventListener('touchmove', function (e) {
        e.preventDefault();
    });
})()