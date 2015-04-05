/********************************************************************************
 * みかんゲーム
 * author: zukkun
 *******************************************************************************/

window.addEventListener('load', function() {
    GameSystem.init();
});

// ゲーム
var GameSystem = {

    canvas: null,
    ctx: null,

    // 音のOn/Off
    useAudio: true,

    // フルスクリーン
    isFullscreen: false,

    // 毎フレーム更新の経過時間計算用
    lastTime: null,

    // パーティクル情報
    emitters: [],
    particles: [],
    EMITTER_INTERVAL: 0.2,

    // 現在シーン
    currentScene: null

};

/**
 * 初期化
 */
GameSystem.init = function() {

  // Canvasの初期化
  GameSystem.setupCanvas();

  // 入力の初期化
  Input.init();

  // アセットの読み込み
  Asset.loadAssets(function() {
      // シーン設定
      GameSystem.currentScene = new MainGameScene();

      // 毎フレーム処理の開始
      window.requestAnimationFrame(GameSystem.update);
  });

};


/**
 * Canvasの初期化
 */
GameSystem.setupCanvas = function() {

  GameSystem.canvas = document.getElementById('canvas');
  GameSystem.canvas.addEventListener('click', GameSystem.onClick);

  var ctx = GameSystem.canvas.getContext('2d');
  ctx.font = '48px monospace';
  ctx.textBaseline = 'top';
  GameSystem.ctx = ctx;

};


/**
 * クリックイベント
 */
GameSystem.onClick = function(e) {

  // 音のOn/Off
  if (740 <= e.offsetX && e.offsetX <= 740 + 48 &&
      10 <= e.offsetY && e.offsetY <= 10 + 48)
  {
    GameSystem.useAudio = !GameSystem.useAudio;
    console.log(GameSystem.useAudio);
  }

  // フルスクリーン
  if (GameSystem.isFullscreen == false &&
      740 <= e.offsetX && e.offsetX <= 740 + 48 &&
      70 <= e.offsetY && e.offsetY <= 70 + 48)
  {
    requestFullscreen.apply(document.getElementById('container'));
  }

};

/**
 * フルスクリーンイベント
 */
GameSystem.onFullscreenChange = function() {

  if (document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullscreenElement ||
      document.msFullscreenElement) {
    game.isFullscreen = true;
  } else {
    game.isFullscreen = false;
  }

};
window.addEventListener('fullscreenchange', GameSystem.onFullscreenChange);
window.addEventListener('webkitfullscreenchange', GameSystem.onFullscreenChange);
window.addEventListener('mozfullscreenchange', GameSystem.onFullscreenChange);
window.addEventListener('MSFullscreenChange', GameSystem.onFullscreenChange);


/**
 * 毎フレーム更新
 */
GameSystem.update = function(time) {

    window.requestAnimationFrame(GameSystem.update);

    // フレーム時間の計算
    var delta = 0;
    if (GameSystem.lastTime != null) {
        delta = (time - GameSystem.lastTime) / 1000;
        if (delta > 0.032) delta = 0.032;
    }
    GameSystem.lastTime = time;

    if (GameSystem.currentScene) {
        GameSystem.currentScene.update(delta);
    }

    // パーティクル
    GameSystem.updateParticle(delta);

    // 描画
    GameSystem.render();

};


/**
 * エミッターの作成
 */
GameSystem.createEmitter = function(x, y, life, amount, thetaStart, thetaEnd) {

  GameSystem.emitters.push({
    x: x, y: y,
    timer: 0, life: life, amount: amount,
    thetaStart: thetaStart, thetaEnd: thetaEnd
  });

};


/**
 * パーティクルの更新
 */
GameSystem.updateParticle = function(delta) {

  // パーティクル
  GameSystem.particles.forEach(function(particle, index) {
    particle.x += particle.vx * delta;
    particle.y += particle.vy * delta;
    particle.vy += 500 * delta;
    particle.life -= delta;
    if (particle.life <= 0) {
      GameSystem.particles.splice(index, 1);
    }
  });

  // エミッター
  GameSystem.emitters.forEach(function(emitter, index) {
    if (emitter.timer <= 0) {
      emitter.amount.times(function() {
        var velo = Math.random() * 100 + 300;
        var theta = Math.random() * (emitter.thetaEnd - emitter.thetaStart) + emitter.thetaStart;
        GameSystem.particles.push({
          x: emitter.x, y: emitter.y,
          vx: Math.cos(theta) * velo,
          vy: Math.sin(theta) * velo,
          life: Math.random() * 0.3 + 0.3,
          opacity: Math.random() * 0.5 + 0.5
        });
      });
      emitter.timer = GameSystem.EMITTER_INTERVAL;
    }

    emitter.life -= delta;
    if (emitter.life <= 0) {
      GameSystem.emitters.splice(index, 1);
    }
  });

};


/**
 * 描画
 */
GameSystem.render = function() {

    var ctx = GameSystem.ctx;
    ctx.clearRect(0, 0, GameSystem.canvas.width, GameSystem.canvas.height);

    if (GameSystem.currentScene) {
        GameSystem.currentScene.render(ctx);
    }

    // パーティクル
    ctx.globalCompositeOperation = 'lighter';
    GameSystem.particles.forEach(function(particle) {
        ctx.globalAlpha = particle.opacity;
        ctx.drawImage(Asset.images.star, particle.x, particle.y);
    });
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';

    // 音のOn/Offボタン
    ctx.drawImage(Asset.images['speaker' + (GameSystem.useAudio ? '' : '_no')], 740, 10);

    // フルスクリーンボタン
    if (GameSystem.isFullscreen == false) {
        ctx.drawImage(Asset.images.fullscreen, 740, 70);
    }

};

