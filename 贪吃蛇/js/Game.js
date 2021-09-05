function Game() {
    // 行数
    this.row = 20;
    // 列数
    this.col = 20;
    // 分数
    this.score = 0;
    // 初始化
    this.init();
    // 实例化蛇类
    this.snake = new Snake();
    // 食物类
    this.food = new Food(this);
    // 定时器
    this.start();
    // 键盘监听
    this.bindEvent();
}
// 初始化
Game.prototype.init = function () {
    // 创建 table
    this.dom = document.createElement('table');
    let tr, td;
    // 遍历行和列上树
    for (let i = 0; i < this.row; i++) {
        // 创建 tr
        tr = document.createElement('tr')
        for (let j = 0; j < this.col; j++) {
            // 创建td
            td = document.createElement('td')
            tr.appendChild(td)
        }
        this.dom.appendChild(tr)
    }
    let score = document.createElement('h3');
    score.classList = 'score'
    score.innerHTML = '分数：0'
    document.getElementById('app').appendChild(score)
    document.getElementById('app').appendChild(this.dom)
}
Game.prototype.setHtml = function (row, col, html) {
    this.dom.querySelectorAll('tr')[row].querySelectorAll('td')[col].innerHTML = html;
}
// 设置颜色
Game.prototype.setColor = function (row, col, color) {
    this.dom.querySelectorAll('tr')[row].querySelectorAll('td')[col].style.background = color;
}
// 清屏
Game.prototype.clear = function () {
    for (let i = 0; i < this.row; i++) {
        for (let j = 0; j < this.col; j++) {
            this.dom.querySelectorAll('tr')[i].querySelectorAll('td')[j].style.background = '#fff'
            this.dom.querySelectorAll('tr')[i].querySelectorAll('td')[j].innerHTML = "";
        }
    }
}
// 定时器
Game.prototype.start = function () {
    this.f = 0;
    this.timer = setInterval(function () {
        game.f++;
        // 清屏
        game.clear();
        // 运动
        var during = game.snake.body.length < 30 ? 30 - game.snake.body.length : 1;
        game.f % during == 0 && game.snake.update();
        // 渲染
        game.snake.render();
        // 食物
        game.food.render();

    }, 2)
}
// 事件监听
Game.prototype.bindEvent = function () {
    // onkeydown 里面的 this 指向的是 window 
    // 使用一个变量接收 this
    let self = this;
    document.onkeydown = function (e) {
        let event = e || window.event;
        switch (event.keyCode) {  // 获取当前按下键盘键的编码
            case 37:  // 左箭头键
                if (self.snake.direction == "R") return

                self.snake.changeDirection("L")
                break;
            case 39:  // 右箭头键
                if (self.snake.direction == "L") return

                self.snake.changeDirection("R")
                break;
            case 38:  // 上箭头键
                if (self.snake.direction == "D") return

                self.snake.changeDirection("U")
                break;
            case 40:  // 下箭头键
                if (self.snake.direction == "U") return

                self.snake.changeDirection("D")
                break;
        }

    }
}

