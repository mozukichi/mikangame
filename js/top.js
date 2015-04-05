/**
 * トップ画面
 */
var TopScene = function() {
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
    }

};


/**
 * 描画
 */
TopScene.prototype.render = function(ctx) {

    // 背景の描画
    ctx.drawImage(Asset.images.back, 0, 0);

    // スタートボタンの描画
    ctx.drawImage(Asset.images.startbutton, 400, 450);

};
