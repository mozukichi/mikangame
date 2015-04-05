/**
 * 入力
 */
var Input = {

    // 箱の移動状態
    moveType: null // 左:"left", 右:"right"

};


/**
 * 初期化
 */
Input.init = function() {

    // 左右カーソルキーイベント 押下時
    window.addEventListener('keydown', function(e) {
      switch (e.keyCode) {
        case 37:
          Input.moveType = 'left';
          break;
        case 39:
          Input.moveType = 'right';
          break;
      }
    });

    // キーを離した時イベント
    window.addEventListener('keyup', function() {
        Input.moveType = null;
    });

}
