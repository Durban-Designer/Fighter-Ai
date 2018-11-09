const ioHook = require("iohook");
const tf = require('@tensorflow/tfjs');
const fs = require('fs');
var screenCap = require('desktop-screenshot');
require('@tensorflow/tfjs-node');
const data = require('./src/data');
const virtKeys = require('./src/virtKeys');
const model = require('./src/model');
// const brain = data.getBrain('brainAlpha');
var dir = __dirname;
var paused = true;
var loopInterval,
  image,
  imageData,
  result

ioHook.on('keyup', event => {
  if (event.keycode === 88) {
    if (paused) {
      paused = false;
      gameLoop();
    } else {
      paused = true;
    }
  }
});

ioHook.start();
const gameLoop = function () {
  if (!paused) {
    screenCap(dir + '\\image.png', {width: 800, height: 600, quality: 60}, function (error, complete) {
      if (error) {
        console.log(error);
      } else {
        internalLoop();
      }
    })
  }
}

const internalLoop = async function () {
  await getImageTensor();
  result = model.predict(imageData, {batchSize: 4});
  console.log(result);
  // brainResult = brain(result);
  // virtKeys.dispatch(brainResult);
  fs.unlinkSync(dir + '\\image.png');
  gameLoop();
  return;
}

const getImageTensor = async function () {
  imageData = await data.getImage(dir + '\\image.png');
  console.log(imageData);
  return;
}
