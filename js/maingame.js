/**
 * メインゲーム
 */
var MainGameScene = function() {

    // フェーズ
    this.phase = 'start';

    // ライフ
    this.life = 3; // 初期ライフ

    // ライフ消失アニメーション
    this._lifePhase = null;
    this._lifePhaseTime = 0;

    // スコア
    this.score = 0;
    this.scoreTextScale = 1;

    // 箱（プレイヤー）
    this.box = new Box();

    // みかん操作
    this.mikanController = new MikanController();

    // みかん落下時のイベント
    this.mikanController.onLostMikan = this._onLostMikan.bind(this);

};


/**
 * 更新
 */
MainGameScene.prototype.update = function(delta) {

    switch (this.phase) {
        case 'start':
            // スタート
            Audio.play('gamestart', function() {
                // ゲームフェーズへ
                this.phase = 'game';

                // BGMの再生
                Audio.playMusic('assets/mikanmusic.mp3', true);
            }.bind(this));
            this.phase = null;
            break;
        case 'game':
            // ゲーム
            this._gamePhase(delta);
            break;
        case 'gameover':
            // ゲームオーバー
            break;
        default:
            // nothing to do
            break;
    }

};


/**
 * ゲームフェーズ
 */
MainGameScene.prototype._gamePhase = function(delta) {

    // 箱（プレイヤー）の更新
    this.box.update(delta);

    // みかんの更新
    this.mikanController.update(delta);

    // 箱とみかんの衝突判定
    this.mikanController.collideMikan(this.box, function() {

        // スコア加算
        this.score++;

        // みかん取得効果音を再生
        if (this.score % 10 == 0) {
            // 10個毎に「やったね」を再生
            Audio.play('getmikan', function() {
                Audio.play('yattane');
            });
        } else {
            Audio.play('getmikan');
        }

        // エミッター作成
        ParticleSystem.createEmitter(this.box.position.x + 40, 455, 0, 30,
            Math.PI * 5 / 4, Math.PI * 7 / 4);

    }.bind(this));

    // ライフ消失
    if (this._lifePhase == 'losting') {
        this._lifePhaseTime -= delta;
        if (this._lifePhaseTime <= 0) {
            this.life--;
            this._lifePhase = null;
        }
    }

    // ゲームオーバー
    if (this.life <= 0) {
        this.phase = 'gameover';

        Audio.stopMusic();
        Audio.play('gameover', function() {
            GameSystem.currentScene = new TopScene();
        });
    }

};


/**
 * みかん落下時
 */
MainGameScene.prototype._onLostMikan = function() {

    if (this._lifePhase == 'losting') {
        this.life--;
    } else {
        this._lifePhase = 'losting';
    }
    this._lifePhaseTime = 0.5;

};


/**
 * 描画
 */
MainGameScene.prototype.render = function(ctx) {

    // 背景の描画
    ctx.drawImage(Asset.images.back, 0, 0);

    // 箱（プレイヤー）の描画
    this.box.render(ctx);

    // みかんの描画
    this.mikanController.render(ctx);

    // ライフの描画
    this.life.times(function(i) {
        var drawLife = true;

        // ライフ消失時のアニメーション
        if (i == this.life - 1 && this._lifePhase == 'losting') {
            if (this._lifePhaseTime % 0.1 < 0.05) {
                drawLife = false;
            }
        }

        if (drawLife) {
            ctx.drawImage(Asset.images.life, 20, 520 - i * 60);
        }
    }.bind(this));

    // スコアの描画
    var scoreText = '' + this.score + 'こ';
    var metrics = ctx.measureText(scoreText);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 8;
    ctx.strokeText(scoreText, 780 - metrics.width, 532);
    ctx.fillText(scoreText, 780 - metrics.width, 532);

};
