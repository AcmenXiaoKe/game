function Food(gameSnake) {
    var self = this;
    // 循环判断
    // 判断生成的食物是否在蛇的身体上
    // 如果存在就重新生成食物
    do {
        this.row = parseInt(Math.random() * gameSnake.row);
        this.col = parseInt(Math.random() * gameSnake.col);
    } while ((function () {
        for (let i = 0; i < gameSnake.snake.body.length; i++) {
            if (gameSnake.snake.body[i].row == self.row && gameSnake.snake.body[i].col == self.col) {
                return true;
            }
        }
        return false
    })())
}
// 食物的渲染
Food.prototype.render = function () {
    game.setHtml(this.row, this.col, '♥')
}