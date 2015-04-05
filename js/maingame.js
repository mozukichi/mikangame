/**
 * メインゲーム
 */
var MainGameScene = function() {

    // フェーズ
    this.phase = 'start';

    // ライフ
    this.life = 5; // 初期ライフ

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

    // スコアあたりのみかん出現頻度
    this.DIFFICULTY_TABLE = [
        { score: 10, interval: 2.8 },
        { score: 20, interval: 2.5 },
        { score: 30, interval: 2.2 },
        { score: 40, interval: 2.0 },
        { score: 50, interval: 1.7 },
        { score: 70, interval: 1.5 },
        { score: 90, interval: 1.3 }
    ];

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
            this.phase = 'wait';
            break;
        case 'wait':
            // 箱（プレイヤー）の更新
            this.box.update(delta);
            break;
        case 'game':
            // ゲーム
            this._gamePhase(delta);
            break;
        case 'gameover':
            // ゲームオーバー
            break;
        case 'clear':
            // クリア
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

        // みかん出現頻度
        this.DIFFICULTY_TABLE.forEach(function(difficult) {
            if (this.score >= difficult.score) {
                this.mikanController.mikanInterval = difficult.interval;
            }
        }.bind(this));

        // みかん取得効果音を再生
        if (this.score != 100 && this.score % 10 == 0) {
            // 10個毎に「やったね」を再生
            Audio.play('getmikan', function() {
                Audio.play('yattane');
            });
        } else if (this.score >= 100) {
            // クリア
            Audio.stopMusic();
            Audio.play('getmikan', function() {
                Audio.play('complete', function() {
                    // エンディングへ
                    GameSystem.currentScene = new EndingScene();
                });
            });
            this.phase = 'claer';
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
