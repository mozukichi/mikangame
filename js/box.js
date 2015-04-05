/**
 * 箱（プレイヤー）
 */
var Box = function() {

    // 初期位置
    this.position = {
        x: 350,
        y: 450
    };

    // 画像
    this.image = Asset.images.box;

};


/**
 * 更新
 */
Box.prototype.update = function(delta) {

    // 箱の移動
    switch (Input.moveType) {
        case 'left':
            this.position.x -= 300 * delta;
            break;
        case 'right':
            this.position.x += 300 * delta;
            break;
    }
    if (this.position.x < 0) this.position.x = 0;
    if (this.position.x + this.image.width > 800) this.position.x = 800 - this.image.width;

};


/**
 * 描画
 */
Box.prototype.render = function(ctx) {

  ctx.drawImage(this.image, this.position.x, this.position.y);

};
