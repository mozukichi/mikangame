/**
 * エンディング
 */
var EndingScene = function() {

    // スタッフクレジット
    this.STAFF_CREDIT = [
        { role: 'プログラム', name: 'もっち' },
        { role: 'イラスト', name: 'もっち' },
        { role: '効果音', name: 'もっち' },
        { role: '音楽', name: 'みうちゃん' },
        { role: '声', name: 'みうちゃん' },
        { role: '企画・原案', name: 'みうちゃん' }
    ];

    this.FADE_TIME = 0.5;
    this.CREDIT_TIME = 3;

    this._fadePhase = 'start';
    this._time = 1;
    this._alpha = 0;
    this._currentCredit = 0;

};


/**
 * 更新
 */
EndingScene.prototype.update = function(delta) {

    switch (this._fadePhase) {
        case 'start':
            if (this._time <= 0) {
                this._time = this.FADE_TIME;
                this._fadePhase = 'in';
            }
            break;
        case 'in':
            this._alpha = (this.FADE_TIME - this._time) / this.FADE_TIME;
            if (this._time <= 0) {
                this._time = this.CREDIT_TIME;
                this._fadePhase = 'show';
            }
            break;
        case 'show':
            this._alpha = 1;
            if (this._time <= 0) {
                this._time = this.FADE_TIME;
                this._fadePhase = 'out';
            }
            break;
        case 'out':
            this._alpha = this._time / this.FADE_TIME;
            if (this._time <= 0) {
                this._alpha = 0;
                this._time = this.FADE_TIME;
                this._fadePhase = 'in';
                this._currentCredit++;

                if (this._currentCredit >= this.STAFF_CREDIT.length) {
                    GameSystem.currentScene = new TopScene();
                }
            }
            break;
    }

    this._time -= delta;
};


/**
 * 描画
 */
EndingScene.prototype.render = function(ctx) {

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GameSystem.canvas.width, GameSystem.canvas.height);

    ctx.drawImage(Asset.images.ending, 50, 84);

    ctx.globalAlpha = this._alpha;

    var staff = this.STAFF_CREDIT[this._currentCredit];

    // 役割
    ctx.font = '28px monospace';
    ctx.fillStyle = 'lightgray';
    ctx.fillText(staff.role, 380, 250);

    // 名前
    ctx.font = '36px monospace';
    ctx.fillStyle = 'white';
    ctx.fillText(staff.name, 420, 300);

    ctx.globalAlpha = 1;

};
