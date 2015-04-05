/**
 * 音声
 */
var Audio = {
    ctx: null,
    audioElem: null
};


/**
 * 初期化
 */
Audio.init = function() {
    this.ctx = new AudioContext();
    this.audioElem = document.createElement('audio');
};


/**
 * 効果音の再生
 */
Audio.play = function(name, onEnded) {
    if (!name in Asset.sounds) {
        throw new Error('指定した効果音リソースが無い: ' + name);
    }

    var source = Audio.ctx.createBufferSource();

    source.buffer = Asset.sounds[name];
    source.connect(Audio.ctx.destination);

    if (onEnded && typeof onEnded == 'function') {
        source.onended = onEnded;
    }

    source.start(0);
};


/**
 * 音楽の再生
 */
Audio.playMusic = function(src, loop) {
    this.audioElem.src = src;
    if (loop == undefined) {
        this.audioElem.loop = false;
    } else {
        this.audioElem.loop = loop;
    }
    this.audioElem.play();
};
