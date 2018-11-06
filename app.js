const ioHook = require("iohook");
var paused = true
var loopInterval

ioHook.on('keyup', event => {
  console.log(event);
  if (event.keycode === 123) {
    if (paused) {
      loopInterval = setInterval(gameLoop, 15);
      paused = false
    } else {
      clearInterval(loopInterval);
      paused = true
    }
  }
});

function gameLoop () {
  console.log('running');
}
npm install --save iohook
