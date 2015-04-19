/**
 * トップ画面
 */
var TopScene = function() {

    this._overStartButton = false;
    this._overHardButton = false;

    this._showHardButton = false;
    if (localStorage['showHardButton'] == "show") {
        this._showHardButton = true;
    }

    // エンターキー押下でゲームスタート
    this._onKeyup = function(e) {
        if (e.keyCode == 13) {
            this._startGame('normal');
        }
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
    if (430 <= x && x <= 780 &&
        450 <= y && y <= 550)
    {
        // ゲームスタート
        this._startGame('normal');
    }

    // むずかしいモード
    if (this._showHardButton &&
        30 <= x && x <= 380 &&
        450 <= y && y <= 550)
    {
        // ゲームスタート
        this._startGame('hard');
    }

};


/**
 * マウスカーソル移動時
 */
TopScene.prototype.onMouseMove = function(x, y) {

    // スタートボタン
    if (430 <= x && x <= 780 &&
        450 <= y && y <= 550)
    {
        this._overStartButton = true;
        GameSystem.canvas.style.cursor = 'pointer';
    }
    // むずかしいモードボタン
    else if (this._showHardButton &&
             30 <= x && x <= 380 &&
             450 <= y && y <= 550)
    {
        this._overHardButton = true;
        GameSystem.canvas.style.cursor = 'pointer';
    }
    else {
        this._overStartButton = false;
        this._overHardButton = false;
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
    ctx.fillText('あそぶ　：パソコンのエンターキーをおす', 50, 350);
    ctx.fillText('（したのボタンでもいいよ）', 178, 390);

    // スタートボタンの描画
    ctx.save();
    if (this._overStartButton) {
        ctx.globalAlpha = 0.7;
    }
    ctx.drawImage(Asset.images.startbutton, 430, 450);
    ctx.restore();

    // むずかしいモードボタンの描画
    if (this._showHardButton) {
        ctx.save();
        if (this._overHardButton) {
            ctx.globalAlpha = 0.7;
        }
        ctx.drawImage(Asset.images.hardmode, 30, 450);
        ctx.restore();
    }

};


/**
 * ゲームスタート
 */
TopScene.prototype._startGame = function(dificulty) {
    window.removeEventListener('keyup', this._onKeyup);
    Transition.transitionTo('fade', 1, new MainGameScene(dificulty));
    GameSystem.canvas.style.cursor = '';
};
