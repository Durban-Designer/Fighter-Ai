const ioHook = require("iohook");
const tf = require('@tensorflow/tfjs');
const fs = require('fs');
var screenCap = require('desktop-screenshot');
const argparse = require('argparse');
require('@tensorflow/tfjs-node');
const data = require('./src/data');
const virtKeys = require('./src/virtKeys');
var dir = __dirname;
var paused = true;
var loopInterval,
  image,
  imageData,
  result

async function run (name, brain) {
  if (name === '') {
    console.log('Warning!! You must provide a --model_name argument so we know what model to use');
    process.exit(1);
  } else if (brain === '') {

  } else {
    try {
      const model = await tf.loadModel(name);
    } catch (err) {
      console.log('failed to load model.');
      process.exit(1);
    }
    try {
      const brain = data.getBrain(brain);
    } catch (err) {
      console.log('failed to load brain');
      process.exit(1);
    }
    ioHook.start();
    return;
  }
}

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
  brainResult = brain(result);
  virtKeys.dispatch(brainResult);
  fs.unlinkSync(dir + '\\image.png');
  gameLoop();
  return;
}

const getImageTensor = async function () {
  imageData = await data.getImage(dir + '\\image.png');
  console.log(imageData);
  return;
}

const parser = new argparse.ArgumentParser({
  description: 'TensorFlow.js-Node-gpu Mugen Trainer.',
  addHelp: true
});
parser.addArgument('--model_name', {
  type: 'string',
  defaultValue: '',
  help: 'Path to where the model to use is stored.'
});
parser.addArgument('--brain_name', {
  type: 'string',
  defaultValue: '',
  help: 'Name of the brain to retrieve from the cloud.'
});
const args = parser.parseArgs();

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

run(args.model_name, args.brain_name);
