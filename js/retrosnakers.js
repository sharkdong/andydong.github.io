/**
 * Created by Andy on 2017/10/6.
 */
(function () {
    var map;
    var food;
    var snake;
    var time = 200;
    var num = 0;
    var timeTaskId;

    //定义地图
    function Map() {
        this.width = 800;
        this.height = 400;
        this.color = "#dddddd";
        this.position = 'absolute';
        this._map = null;

        this.show = function () {
            this._map = document.createElement('div');
            this._map.style.width = this.width + 'px';
            this._map.style.height = this.height + 'px';
            this._map.style.backgroundColor = this.color;
            this._map.style.position = this.position;

            //追加到对应的元素中
            document.getElementsByClassName('snaker-map')[0].appendChild(this._map);
        }
    }

    //定义 食物
    function Food() {
        this.width = 20;
        this.height = 20;
        this.color = 'green';
        this.position = 'absolute';
        this.x = 0;
        this.y = 0;
        this._food = null;

        this.show = function () {
            this.x = Math.floor(Math.random() * 40);
            this.y = Math.floor(Math.random() * 20);
            if (this._food == null) {
                this._food = document.createElement('div');
                this._food.style.width = this.width + 'px';
                this._food.style.height = this.height + 'px';
                this._food.style.backgroundColor = this.color;
                this._food.style.position = this.position;
                map._map.appendChild(this._food);
            }
            this._food.style.left = this.x * 20 + 'px';
            this._food.style.top = this.y * 20 + 'px';
        }
    }

    // 定义 蛇
    function Snake() {
        this.width = 20;
        this.height = 20;
        this.position = 'absolute';
        this.direct = 'right';
        this.body = [[3, 2, 'red', null], [2, 2, 'blue', null], [1, 2, 'blue', null]];

        this.show = function () {
            //判断是否越界
            if (!(this.body[0][0] >= 0 && this.body[0][0] * 20 < map.width) || !(this.body[0][1] >= 0 && this.body[0][1] * 20 < map.height)) {
                this.snakeFail(1);
                return false;
            }
            var length = this.body.length;
            //获取蛇节的长度
            for (var i = 0; i < length; i++) {
                if (this.body[i][3] == null) {
                    this.body[i][3] = document.createElement('div');
                    this.body[i][3].style.width = this.width + 'px';
                    this.body[i][3].style.height = this.height + 'px';
                    this.body[i][3].style.backgroundColor = this.body[i][2];
                    this.body[i][3].style.position = this.position;
                    map._map.appendChild(this.body[i][3]);
                }
                this.body[i][3].style.left = this.body[i][0] * 20 + 'px';
                this.body[i][3].style.top = this.body[i][1] * 20 + 'px';
            }
        };

        //移动蛇
        this.move = function () {
            if (this.body[0][0] == food.x && this.body[0][1] == food.y) {
                this.body.push([0, 0, 'blue', null]);
                food.show();
                ++num;
                moveSnaker();
            }

            var length = this.body.length;
            for (var i = length - 1; i > 0; i--) {
                this.body[i][0] = this.body[i - 1][0];
                this.body[i][1] = this.body[i - 1][1];
            }

            if (this.direct == 'right') {
                this.body[0][0] += 1;
            }

            if (this.direct == 'left') {
                this.body[0][0] -= 1;
            }

            if (this.direct == 'up') {
                this.body[0][1] -= 1;
            }

            if (this.direct == 'down') {
                this.body[0][1] += 1;
            }

            //判断 头部是不是吃到了其他的位置
            for (var j = length - 1; j > 0; j--) {
                if (this.body[0][0] == this.body[j][0] && this.body[0][1] == this.body[j][1]) {
                    this.snakeFail(2);
                    return false;
                }
            }

            this.show();
        };

        //游戏失败
        this.snakeFail = function (data) {
            if (data == 1) {
                alert('醒醒吧！死了！！！别挣扎了。撞墙了！分数为：' + num);
            } else if (data == 2) {
                alert('不要命了？吃到自己了！分数为：' + num);
            }
            InitPlay();
        }

        //设置蛇前进方向
        this.setDirect = function (code) {
            switch (code) {
                case 37:
                    if (this.direct != 'right') {
                        this.direct = 'left';
                    }
                    break;
                case 38:
                    if (this.direct != 'down') {
                        this.direct = 'up';
                    }
                    break;
                case 39:
                    if (this.direct != 'left') {
                        this.direct = 'right';
                    }
                    break;
                case 40:
                    if (this.direct != 'up') {
                        this.direct = 'down';
                    }
                    break;
            }
        }
    }

    //改变蛇移动速度
    function moveSnaker() {
        if (timeTaskId) {
            clearInterval(timeTaskId);
            time = time * 0.95;
        }

        timeTaskId = setInterval(function () {
            snake.move();
        }, time);
    }

    //构建游戏
    function InitPlay() {
        map = new Map();
        map.show();
        food = new Food();
        food.show();
        snake = new Snake();
        snake.show();
        time = 200;
        num = 0;
        moveSnaker();
    }

    // 定义 window.onload()
    window.onload = function () {
        InitPlay();
        document.onkeydown = function (event) {
            var code;
            if (window.event) {
                code = window.event.keyCode;
            } else {
                code = event.keyCode;
            }
            snake.setDirect(code);
        }
    }
})()