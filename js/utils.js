// times
Number.prototype.times = function(funct) {
  if (typeof funct === 'function') {
    for (var i = 0; i < Math.floor(this); i++) {
      funct(i);
    }
  }
  return this;
}

// requestFullscreen
var requestFullscreen =
  Element.prototype.requestFullscreen ||
  Element.prototype.webkitRequestFullscreen ||
  Element.prototype.mozRequestFullscreen ||
  Element.prototype.msRequestFullscreen;
