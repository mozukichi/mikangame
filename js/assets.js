var Asset = {};

// アセット情報
Asset.assets = [
    // 画像
    { type: 'image', name: 'startbutton', src: 'assets/startbutton.png' },
    { type: 'image', name: 'speaker',     src: 'assets/speaker.png' },
    { type: 'image', name: 'speaker_no',  src: 'assets/speaker_no.png' },
    { type: 'image', name: 'fullscreen',  src: 'assets/fullscreen.png' },
    { type: 'image', name: 'box',         src: 'assets/box.png' },
    { type: 'image', name: 'back',        src: 'assets/back.png' },
    { type: 'image', name: 'mikan',       src: 'assets/mikan.png' },
    { type: 'image', name: 'life',        src: 'assets/life.png' },
    { type: 'image', name: 'star',        src: 'assets/star.png' },

    // 効果音
    { type: 'sound', name: 'gamestart',   src: 'assets/gamestart.mp3' },
    { type: 'sound', name: 'getmikan',    src: 'assets/getmikan.mp3' },
    { type: 'sound', name: 'lostmikan',   src: 'assets/lostmikan.mp3' },
    { type: 'sound', name: 'yattane',     src: 'assets/yattane.mp3' }
];


// 画像リソース
Asset.images = {};

// 効果音リソース
Asset.sounds = {};


/**
 * アセットの読み込み
 */
Asset.loadAssets = function(onComplete) {
    var total = Asset.assets.length;
    var loadCount = 0;
    var onLoad = function() {
        loadCount++;
        if (loadCount >= total) {
            onComplete();
        }
    };
    Asset.assets.forEach(function(asset) {
        switch (asset.type) {
            case 'image':
                Asset._loadImage(asset, onLoad);
                break;
            case 'sound':
                Asset._loadSound(asset, onLoad);
                break;
        }
    });
};


/**
 * 画像の読み込み
 */
Asset._loadImage = function(asset, onLoad) {
    var image = new Image();
    image.src = asset.src;
    Asset.images[asset.name] = image;
    image.onload = onLoad;
};


/**
 * 効果音の読み込み
 */
Asset._loadSound = function(asset, onLoad) {
    var request = new XMLHttpRequest();
    request.open('GET', asset.src, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        Audio.ctx.decodeAudioData(request.response, function(buffer) {
            Asset.sounds[asset.name] = buffer;
            onLoad();
        }, function() {
            throw new Error('効果音の読み込みに失敗: ' + asset.name + ' ' + asset.src);
        });
    };
    request.send();
};
