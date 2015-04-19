/**
 * 入力
 */
var Input = {

    // キーの押下状態
    state: {
        37: false,
        39: false
    },

    // 箱の移動状態
    moveType: null // 左:"left", 右:"right"

};


/**
 * 初期化
 */
Input.init = function() {

    // 左右カーソルキーイベント 押下時
    window.addEventListener('keydown', function(e) {
        Input.state[e.keyCode] = true;

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
    window.addEventListener('keyup', function(e) {
        Input.state[e.keyCode] = false;

        if (Input.state[37] == false && Input.state[39] == false) {
            Input.moveType = null;
        }
    });

}
