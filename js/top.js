/**
 * トップ画面
 */
var TopScene = function() {

    this._overStartButton = false;

};


/**
 * 更新
 */
TopScene.prototype.update = function(delta) {
};


/**
 * クリック時
 */
TopScene.prototype.onClick = function(e) {

    // スタートボタン
    if (400 <= e.offsetX && e.offsetX <= 750 &&
        450 <= e.offsetY && e.offsetY <= 550)
    {
        GameSystem.currentScene = new MainGameScene();
        GameSystem.canvas.style.cursor = '';
    }

};


/**
 * マウスカーソル移動時
 */
TopScene.prototype.onMouseMove = function(e) {

    // スタートボタン
    if (400 <= e.offsetX && e.offsetX <= 750 &&
        450 <= e.offsetY && e.offsetY <= 550)
    {
        this._overStartButton = true;
        GameSystem.canvas.style.cursor = 'pointer';
    }
    else {
        this._overStartButton = false;
        GameSystem.canvas.style.cursor = '';
    }

};


/**
 * 描画
 */
TopScene.prototype.render = function(ctx) {

    // 背景の描画
    ctx.drawImage(Asset.images.back, 0, 0);

    // スタートボタンの描画
    if (this._overStartButton) {
        ctx.globalAlpha = 0.7;
    }
    ctx.drawImage(Asset.images.startbutton, 400, 450);
    ctx.globalAlpha = 1;

};
