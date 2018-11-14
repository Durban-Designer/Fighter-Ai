const ioHook = require("iohook");
const screenCap = require('desktop-screenshot');
const argparse = require('argparse');
const mkdirp = require('mkdirp');
const {Storage} = require('@google-cloud/storage');
const storage = new Storage({
  projectId: 'key-autumn-176022',
  keyFilename: 'C:\\Users\\admin\\Documents\\Coding\\Node\\Fighter-Ai\\key.json'
});
const bucket = storage.bucket('fighter-ai');
const fs = require('fs');
var batchNum = Math.floor(Math.random() * 10000);
const opts = { includeFiles: true };
var paused = true;
var i = 0;
var x = 0;
var dir = __dirname + '\\images';
var loopInterval, cloudDir;

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

function run (batchName) {
  if (batchName === '') {
    cloudDir = batchNum;
  } else {
    cloudDir = batchName;
  }
  mkdirp(dir, function(err) {
    ioHook.start();
    gameLoop();
  });
}

function gameLoop () {
  if (paused === false) {
    var path = dir + '\\image' + i + '.png'
    var options = {
      destination: 'unlabeled/' + cloudDir + i + '.png'
    };
    screenCap(path, {width: 800, height: 600, quality: 60}, function (error, complete) {
      if (error) {
        console.log(error + 'screen cap error');
      } else {
        bucket.upload('images\\image' + i + '.png', options, function(err, file) {
          if (!err) {
            fs.unlinkSync(path);
            console.log('captured screen number ' + i);
          } else {
            console.log(err);
          }
        });
        i++
        gameLoop();
      }
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
  help: 'Name of the cloud Folder to where images will be saved.'
});
const args = parser.parseArgs();

run(args.batch_name);
