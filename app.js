const ioHook = require("iohook");
const tf = require('@tensorflow/tfjs');
var screenCap = require('desktop-screenshot');
require('@tensorflow/tfjs-node');
const { createCanvas, loadImage } = require('canvas')
const canvas = createCanvas(1920, 1080)
const ctx = canvas.getContext('2d')
var dir = __dirname
var paused = true
var loopInterval,
  image,
  result

ioHook.on('keyup', event => {
  if (event.keycode === 88) {
    if (paused) {
      loopInterval = setInterval(gameLoop, 1000);
      paused = false
    } else {
      clearInterval(loopInterval);
      paused = true
    }
  }
});

ioHook.start();
function gameLoop () {
  screenCap(dir + '\\image.png', {width: 1920, height: 1080, quality: 100}, function (error, complete) {
    if (error) {
      console.log(error);
    } else {
      loadImage(dir + '\\image.png').then((screen) => {
        ctx.drawImage(screen, 50, 0, 70, 70)
        image = tf.fromPixels(canvas);
        result = model.predict(image, {batchSize: 4});
      })
    }
  })
}
