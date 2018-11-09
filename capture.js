const ioHook = require("iohook");
const screenCap = require('desktop-screenshot');
const argparse = require('argparse');
const mkdirp = require('mkdirp');
var batchNum = Math.floor(Math.random() * 10000)
var paused = true;
var i = 0;
var x = 0;
var loopInterval,
  dir

ioHook.on('keyup', event => {
  console.log(event.keycode)
  if (event.keycode === 88) {
    if (paused) {
      paused = false;
      gameLoop();
    } else {
      paused = true;
    }
  }
});

async function run (batchName) {
  if (batchName === '') {
    dir = __dirname + '\\images\\Batch' + batchNum;
  } else {
    dir = __dirname + '\\images\\' + batchName;
  }
  mkdirp(dir, function(err) {
    ioHook.start();
    gameLoop();
  });
}

function gameLoop () {
  if (paused === false) {
    var path = dir + '\\image' + i + '.png'
    screenCap(path, {width: 800, height: 600, quality: 60}, function (error, complete) {
      if (error) {
        console.log(error + 'screen cap error');
      } else {
        console.log('captured screen number ' + i);
        i++
      }
      gameLoop();
    })
  }
}

const parser = new argparse.ArgumentParser({
  description: 'TensorFlow.js-Node-gpu Mugen Trainer.',
  addHelp: true
});
parser.addArgument('--batch_name', {
  type: 'string',
  defaultValue: '',
  help: 'Name of the Folder to where images will be saved.'
});
const args = parser.parseArgs();

run(args.batch_name);
