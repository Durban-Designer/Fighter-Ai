const ioHook = require("iohook");
var paused = true
var loopInterval

ioHook.on('keyup', event => {
  if (event.keycode === 88) {
    if (paused) {
      loopInterval = setInterval(gameLoop, 15);
      paused = false
    } else {
      clearInterval(loopInterval);
      paused = true
    }
  }
});

ioHook.start();
function gameLoop () {
  console.log('running');
}
