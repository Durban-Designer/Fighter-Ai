const tf = require('@tensorflow/tfjs');
const assert = require('assert');
const fs = require('fs');
const axios = require('axios');
const brainJs = require('brain.js');
const { Image, createCanvas } = require('canvas');
const canvas = createCanvas(800, 600);
const ctx = canvas.getContext('2d');

async function loadLocalImage (filename) {
  try {
    var img = new Image()
    img.onload = () => ctx.drawImage(img, 0, 0);
    img.onerror = err => { throw err };
    img.src = filename;
    image = tf.fromPixels(canvas);
    image = image.reshape([1, 600, 800, 3]);
    return image;
  } catch (err) {
    console.log(err);
  }
}

class Data {
  constructor () {
    this.brainTrainData = [];
    this.image = null;
    this.trainingImages = [];
    this.trainingLabels = [];
    this.testImages = [];
    this.testLabels = [];
  }

  async loadBrainData() {
    axios.get('https://api.quickvenom.org/brains/training')
      .then(response => {
        this.brainTrainData = response.data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async loadTensorData() {
    // todo write method to load in all training and testing data for a given character matchup
  }

  async getBrain(name) {
    axios.get('https://api.quickvenom.org/brains/' + name)
      .then(response => {
        let json = response.data;
        let net = new brainJs.NeuralNetwork();
        net.fromJSON(json);
        let run = net.toFunction();
        return run
      })
      .catch(err => {
        console.log(err);
      })
  }

  async getImage(filename) {
    try {
      this.image = await loadLocalImage(filename);
    } catch (error) {
      console.log('error loading image', error);
    }
    return this.image;
  }

  getBrainTrainData() {
    return this.brainTrainData;
  }

  getTensorTrainData() {
    return { images: this.trainingImages, labels: this.trainingLabels };
  }

  getTensorTestData() {
    return { images: this.testImages, labels: this.testLabels };
  }
}

module.exports = new Data();
