/**
 * パーティクルシステム
 */
var ParticleSystem = {

    emitters: [],
    particles: [],
    EMITTER_INTERVAL: 0.2,

};


/**
 * 更新
 */
ParticleSystem.update = function(delta) {

    // パーティクル
    this.particles.forEach(function(particle, index) {
        particle.x += particle.vx * delta;
        particle.y += particle.vy * delta;
        particle.vy += 500 * delta;
        particle.life -= delta;
        if (particle.life <= 0) {
            this.particles.splice(index, 1);
        }
    }.bind(this));

    // エミッター
    this.emitters.forEach(function(emitter, index) {
        if (emitter.timer <= 0) {
            emitter.amount.times(function() {
                var velo = Math.random() * 100 + 300;
                var theta = Math.random() * (emitter.thetaEnd - emitter.thetaStart) + emitter.thetaStart;
                this.particles.push({
                    x: emitter.x, y: emitter.y,
                    vx: Math.cos(theta) * velo,
                    vy: Math.sin(theta) * velo,
                    life: Math.random() * 0.3 + 0.3,
                    opacity: Math.random() * 0.5 + 0.5
                });
            }.bind(this));
            emitter.timer = this.EMITTER_INTERVAL;
        }

        emitter.life -= delta;
        if (emitter.life <= 0) {
            this.emitters.splice(index, 1);
        }
    }.bind(this));

};


/**
 * エミッターの作成
 */
ParticleSystem.createEmitter = function(x, y, life, amount, thetaStart, thetaEnd) {

    this.emitters.push({
        x: x, y: y,
        timer: 0, life: life, amount: amount,
        thetaStart: thetaStart, thetaEnd: thetaEnd
    });

};


/**
 * 描画
 */
ParticleSystem.render = function(ctx) {

    ctx.globalCompositeOperation = 'lighter';
    this.particles.forEach(function(particle) {
        ctx.globalAlpha = particle.opacity;
        ctx.drawImage(Asset.images.star, particle.x, particle.y);
    });
    ctx.globalAlpha = 1.0;
    ctx.globalCompositeOperation = 'source-over';

};
