/**
 * トランジション
 */
var Transition = {};


/**
 * トランジション種類
 * 外部からこちらにトランジション種類に応じた処理が追加される
 */
Transition.types = {};


/**
 * トランジション中
 */
Transition.isTransiting = false;


/**
 * 現在のトランジション
 */
Transition._currentTransition = null;


/**
 * トランジション時間
 */
Transition._duration = 0;


/**
 * トランジション経過時間
 */
Transition._progressTime = 0;


/**
 * トランジション先のシーン
 */
Transition.nextScene = null;


/**
 * トランジション進行度
 */
Transition._ratio = 0;


/**
 * トランジション開始
 *
 * @param type String トランジションに登録されている種類名
 * @param duration Number トランジション時間
 * @param nextScene Object トランジション先のシーンオブジェクト
 */
Transition.transitionTo = function(type, duration, nextScene) {
    if (type in this.types) {
        this._currentTransition = this.types[type];
        this._duration = duration;
        this._progressTime = 0;
        this._ratio = 0;

        this.nextScene = nextScene;
        this.isTransiting = true;
    } else {
        throw new Error('Invalid transition type: ' + type);
    }
};


/**
 * 更新
 */
Transition.update = function(delta) {
    if (this.isTransiting) {
        this._progressTime += delta;
        this._ratio = this._progressTime / this._duration;

        if (this._currentTransition) {
            this._currentTransition.update(delta, this._ratio);
        }

        if (this._progressTime > this._duration) {
            this._currentTransition = null;

            // シーン遷移
            if (this.nextScene != null) {
                GameSystem.currentScene = this.nextScene;
            }
            this.nextScene = null;

            this.isTransiting = false;
        }
    }
};


/**
 * 描画
 */
Transition.render = function(ctx) {
    if (this.isTransiting) {
        if (this._ratio > 1.0) {
            this._ratio = 1.0;
        }
        this._currentTransition.render(ctx, this._ratio);
    }
};
