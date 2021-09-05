function Snake() {
    this.color = '#000'
    this.body = [
        { "row": 3, "col": 5 },
        { "row": 3, "col": 4 },
        { "row": 3, "col": 3 },
        { "row": 3, "col": 2 },
    ]
    // 默认方向
    this.direction = "R";
    // 即将改变的方向
    this.willDirection = "R";
}
// 蛇的渲染
Snake.prototype.render = function () {
    // 蛇身体
    this.body.forEach(item => {
        game.setColor(item.row, item.col, this.color);
    })
    // 蛇头
    game.setColor(this.body[0].row, this.body[0].col, 'pink');
}
// 蛇的运动
Snake.prototype.update = function () {
    this.direction = this.willDirection;
    // 判断方向
    switch (this.direction) {
        case "R":
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col + 1 });
            break;
        case "D":
            this.body.unshift({ "row": this.body[0].row + 1, "col": this.body[0].col });
            break;
        case "L":
            this.body.unshift({ "row": this.body[0].row, "col": this.body[0].col - 1 });
            break;
        case "U":
            this.body.unshift({ "row": this.body[0].row - 1, "col": this.body[0].col });
            break;
    }
    // 死亡判断
    if (this.body[0].col > game.col - 1 || this.body[0].row > game.row - 1 || this.body[0].col < 0 || this.body[0].row < 0) {
        this.GameOver()
    }
    // 自己撞到自己的时候也会死亡
    for (let i = 1; i < this.body.length; i++) {
        //判断 蛇头和身体的某一个部分 row 和 col 完全重合的时候就是死亡
        if (this.body[0].col == this.body[i].col && this.body[0].row == this.body[i].row) {
            this.GameOver()
        }
    }
    // 蛇吃食物
    if (this.body[0].row == game.food.row && this.body[0].col == game.food.col) {
        game.food = new Food(game)
        game.f = 0;
        // 分数
        game.score = game.score + 10;
        document.querySelector('.score').innerHTML = '分数：' + game.score
    } else {
        this.body.pop();
    }

}
// 蛇的方向改变，防止的是在一次渲染之前会出现调头的情况
Snake.prototype.changeDirection = function (d) {
    this.willDirection = d;
}
// 游戏结束
Snake.prototype.GameOver = function () {
    alert('游戏结束')
    this.body.shift();
    clearInterval(game.timer)
    document.querySelector('#app').innerHTML = "";
    game = new Game();
}
