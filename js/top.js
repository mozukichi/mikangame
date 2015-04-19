/**
 * トップ画面
 */
var TopScene = function() {

    this._overStartButton = false;

    // エンターキーでゲームスタート
    this._onKeyup = function(e) {
        this._startGame();
    }.bind(this);
    window.addEventListener('keyup', this._onKeyup);

};


/**
 * 更新
 */
TopScene.prototype.update = function(delta) {
};


/**
 * クリック時
 */
TopScene.prototype.onClick = function(x, y, keyCode) {

    // スタートボタン
    if (400 <= x && x <= 750 &&
        450 <= y && y <= 550)
    {
        // ゲームスタート
        this._startGame();
    }

};


/**
 * マウスカーソル移動時
 */
TopScene.prototype.onMouseMove = function(x, y) {

    // スタートボタン
    if (400 <= x && x <= 750 &&
        450 <= y && y <= 550)
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

    // タイトル文字の表示
    ctx.font = '100px monospace';
    ctx.strokeStyle = 'brown';
    ctx.fillStyle = 'orange';
    ctx.lineWidth = 8;
    ctx.strokeText('みかんゲーム', 50, 120);
    ctx.fillText('みかんゲーム', 50, 120);

    // 遊び方の表示
    ctx.font = '32px monosppace';
    ctx.fillStyle = 'black';
    ctx.fillText('あそびかた', 50, 270);
    ctx.fillText('うごかす：パソコンの「←」「→」ボタンをおす', 50, 310);
    ctx.fillText('あそぶ　：パソコンのすきなボタンをおす', 50, 350);
    ctx.fillText('（したのボタンでもいいよ）', 178, 390);

    // スタートボタンの描画
    ctx.save();
    if (this._overStartButton) {
        ctx.globalAlpha = 0.7;
    }
    ctx.drawImage(Asset.images.startbutton, 400, 450);
    ctx.restore();

};


/**
 * ゲームスタート
 */
TopScene.prototype._startGame = function() {
    window.removeEventListener('keyup', this._onKeyup);
    Transition.transitionTo('fade', 1, new MainGameScene());
    GameSystem.canvas.style.cursor = '';
};
