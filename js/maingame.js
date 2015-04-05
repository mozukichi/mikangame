/**
 * メインゲーム
 */
var MainGameScene = function() {

  // ライフ
  this.life = 3; // 初期ライフ

  // スコア
  this.score = 0;
  this.scoreTextScale = 1;

  // 箱（プレイヤー）
  this.box = new Box();

  // みかん操作
  this.mikanController = new MikanController();

};


/**
 * 更新
 */
MainGameScene.prototype.update = function(delta) {

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
        ctx.drawImage(Asset.images.life, 20, 520 - i * 60);
    });

    // スコアの描画
    var scoreText = '' + this.score + 'こ';
    var metrics = ctx.measureText(scoreText);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'green';
    ctx.lineWidth = 8;
    ctx.strokeText(scoreText, 780 - metrics.width, 532);
    ctx.fillText(scoreText, 780 - metrics.width, 532);

};
