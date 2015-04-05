var Asset = {};

// アセット情報
Asset.assets = [
    // 画像
    { type: 'image', name: 'speaker',    src: 'assets/speaker.png' },
    { type: 'image', name: 'speaker_no', src: 'assets/speaker_no.png' },
    { type: 'image', name: 'fullscreen', src: 'assets/fullscreen.png' },
    { type: 'image', name: 'box',        src: 'assets/box.png' },
    { type: 'image', name: 'back',       src: 'assets/back.png' },
    { type: 'image', name: 'mikan',      src: 'assets/mikan.png' },
    { type: 'image', name: 'life',       src: 'assets/life.png' },
    { type: 'image', name: 'star',       src: 'assets/star.png' }
];

// 画像リソース
Asset.images = {};

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
