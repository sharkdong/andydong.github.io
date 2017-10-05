/**
 * Created by Andy on 2017/10/6.
 */
(function () {
    var map;
    var food;
    var snake;

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

        this.show = function () {
            this.x = Math.floor(Math.random() * 40);
            this.y = Math.floor(Math.random() * 20);
            var div = document.createElement('div');
            div.style.width = this.width + 'px';
            div.style.height = this.height + 'px';
            div.style.backgroundColor = this.color;
            div.style.position = this.position;
            div.style.left = this.x * 20 + 'px';
            div.style.top = this.y * 20 + 'px';
            map._map.appendChild(div);
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
            //获取蛇节的长度
            var length = this.body.length;
            for (var i = 0; i < length; i++) {
                if (this.body[i][3] == null) {
                    this.body[i][3] = document.createElement('div');
                    this.body[i][3].style.width = this.width + 'px';
                    this.body[i][3].style.height = this.height + 'px';
                    this.body[i][3].style.backgroundColor = this.body[i][2];
                    this.body[i][3].style.position = this.position;
                    this.body[i][3].style.left = this.body[i][0] * 20 + 'px';
                    this.body[i][3].style.top = this.body[i][1] * 20 + 'px';
                    map._map.appendChild(this.body[i][3]);
                }
                this.body[i][3].style.left = this.body[i][0] * 20 + 'px';
                this.body[i][3].style.top = this.body[i][1] * 20 + 'px';
            }
        };

        this.move = function () {
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
            console.log('this is the snake ===>>', new Date());
            this.show();
        };

        this.setDirect = function (code) {
            switch (code) {
                case 37:
                    this.direct = 'left';
                    break;
                case 38:
                    this.direct = 'up';
                    break;
                case 39:
                    this.direct = 'right';
                    break;
                case 40:
                    this.direct = 'down';
                    break;
            }
        }
    }

    // 定义 window.onload()
    window.onload = function () {
        map = new Map();
        map.show();
        food = new Food();
        food.show();
        snake = new Snake();
        snake.show();
        setInterval(function () {
            snake.move();
        }, 200);
        
        document.onkeydown = function (event) {
            var code;
            if(window.event) {
                code = window.event.keyCode;
            } else {
                code = event.keyCode;
            }
            snake.setDirect(code);
        }
    }
})()