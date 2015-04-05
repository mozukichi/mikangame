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

    // 現在シーン
    currentScene: null

};

/**
 * 初期化
 */
GameSystem.init = function() {

    // Canvasの初期化
    GameSystem.setupCanvas();

    // 音声の初期化
    Audio.init();

    // 入力の初期化
    Input.init();

    // アセットの読み込み
    Asset.loadAssets(function() {
        // BGMの再生
        Audio.playMusic('assets/mikanmusic.mp3', true);

        // シーン設定
        GameSystem.currentScene = new TopScene();

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

    if (GameSystem.currentScene && typeof GameSystem.currentScene.onClick == 'function') {
        GameSystem.currentScene.onClick(e);
    }

};

/**
 * フルスクリーンイベント
 */
GameSystem.onFullscreenChange = function() {

    if (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullscreenElement ||
        document.msFullscreenElement)
    {
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
    ParticleSystem.update(delta);

    // 描画
    GameSystem.render();

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
    ParticleSystem.render(ctx);

    // 音のOn/Offボタン
    ctx.drawImage(Asset.images['speaker' + (GameSystem.useAudio ? '' : '_no')], 740, 10);

    // フルスクリーンボタン
    if (GameSystem.isFullscreen == false) {
        ctx.drawImage(Asset.images.fullscreen, 740, 70);
    }

};

