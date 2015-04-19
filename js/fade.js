/**
 * フェードイン・アウト　トランジション
 */
var FadeInOut = {};


/**
 * 更新
 */
FadeInOut.update = function(delta, ratio) {
    if (ratio < 0.5) {
        if (GameSystem.currentScene &&
            GameSystem.currentScene.update &&
            typeof GameSystem.currentScene.update == 'function')
        {
            GameSystem.currentScene.update(delta);
        }
    } else {
        if (Transition.nextScene &&
            Transition.nextScene.update &&
            typeof Transition.nextScene.update == 'function')
        {
            Transition.nextScene.update(delta);
        }
    }
};

/**
 * 描画
 */
FadeInOut.render = function(ctx, ratio) {
    ctx.save();
    if (ratio < 0.5) {
        if (GameSystem.currentScene &&
            GameSystem.currentScene.render &&
            typeof GameSystem.currentScene.render == 'function')
        {
            GameSystem.currentScene.render(ctx);
        }

        ctx.globalAlpha = ratio * 2;
    } else {
        if (Transition.nextScene &&
            Transition.nextScene.render &&
            typeof Transition.nextScene.render == 'function')
        {
            Transition.nextScene.render(ctx);
        }

        ctx.globalAlpha = 1.0 - (ratio - 0.5) * 2;
    }

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GameSystem.canvas.width, GameSystem.canvas.height);
    ctx.restore();
};


// Transitionに登録
if (Transition) {
    Transition.types['fade'] = FadeInOut;
}
