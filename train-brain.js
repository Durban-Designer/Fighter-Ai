const brain = require('brain');
const axios = require('axios');
const argparse = require('argparse');
const data = require('./src/data');

async function run (name) {
  await data.loadBrainData();
  const trainingData = data.getBrainTrainData();
  var net = new brain.NeuralNetwork();
  net.train(trainingData);
  var json = net.toJSON();
  axios.post('https://api.quickvenom.org/brains', {
    name: name,
    brain: json
  })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    })
}

const parser = new argparse.ArgumentParser({
  description: 'Brain.js Mugen Trainer.',
  addHelp: true
});
parser.addArgument('--brain_name', {
  type: 'string',
  help: 'The name the brain will be saved as.'
});
const args = parser.parseArgs();

run(args.brain_name);
