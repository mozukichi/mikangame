/**
 * みかん操作
 */
var MikanController = function() {

    // みかん発生位置の振れ幅
    this.RANDOM_WIDTH = 500;

    // みかん情報
    this.mikans = [];

    this.mikanInterval = null; // 何秒に1回みかんが生成される？
    this.mikanTimer = 1;
    this.lastMikanXPos = 400; // 前回みかんが生成されたX座標

    this.mikanImage = Asset.images.mikan;

    this.onLostMikan = null; // みかん落下時のイベント

};


/**
 * 更新
 */
MikanController.prototype.update = function(delta) {

    // みかんの生成
    this._generateMikan(delta);

    // みかんは画面外で消失
    this.mikans.forEach(function(mikan, index) {
        mikan.y += 200 * delta;
        if (mikan.y > 600) {
            // みかん落下時の効果音
            Audio.play('lostmikan');

            this.mikans.splice(index, 1);

            if (this.onLostMikan && typeof this.onLostMikan == 'function') {
                this.onLostMikan();
            }
        }
    }.bind(this));

};


/**
 * みかんの生成
 */
MikanController.prototype._generateMikan = function(delta) {

    this.mikanTimer -= delta;
    if (this.mikanTimer <= 0) {
        var mikan = {};
        var lastMikanXPos = this.lastMikanXPos;

        // みかん出現位置範囲
        var spawnRange = {};
        spawnRange.start = lastMikanXPos - this.RANDOM_WIDTH / 2;
        spawnRange.end = lastMikanXPos + this.RANDOM_WIDTH / 2;

        if (spawnRange.start < 0) {
            spawnRange.start = 0;
        }
        if (spawnRange.end >= 800 - this.mikanImage.width) {
            spawnRange.end = 800 - this.mikanImage.width;
        }

        mikan.x = Math.random() * (spawnRange.end - spawnRange.start) + spawnRange.start;

        this.lastMikanXPos = mikan.x;
        mikan.y = -this.mikanImage.height;
        this.mikans.push(mikan);
        this.mikanTimer = this.mikanInterval;
    }

};


/**
 * みかんと箱の衝突判定
 */
MikanController.prototype.collideMikan = function(box, onCollide) {

    this.mikans.forEach(function(mikan, index) {
        if (mikan.x + this.mikanImage.width - 30 > box.position.x + 20 &&
            mikan.x + 30 < box.position.x + box.image.width - 20 &&
            mikan.y + this.mikanImage.height - 30 > 460 &&
            mikan.y + 30 < 450 + box.image.height - 20)
        {
            // みかん削除
            this.mikans.splice(index, 1);

            // 衝突時のイベント
            if (onCollide && typeof onCollide == 'function') {
                onCollide();
            }
        }
    }.bind(this));

};


/**
 * 描画
 */
MikanController.prototype.render = function(ctx) {

    this.mikans.forEach(function(mikan) {
        ctx.drawImage(this.mikanImage, mikan.x, mikan.y);
    }.bind(this));

};
