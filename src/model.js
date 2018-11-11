const tf = require('@tensorflow/tfjs');
const model = tf.sequential();
model.add(tf.layers.conv2d({
  inputShape: [600, 800, 3],
  kernelSize: 5,
  filters: 8,
  strides: 10,
  activation: 'relu',
  kernelInitializer: 'VarianceScaling'
}));
model.add(tf.layers.maxPooling2d({
  poolSize: [2, 2],
  strides: [2, 2]
}));
model.add(tf.layers.conv2d({
  kernelSize: 5,
  filters: 16,
  strides: 5,
  activation: 'relu',
  kernelInitializer: 'VarianceScaling'
}));
model.add(tf.layers.maxPooling2d({
  poolSize: [2, 2],
  strides: [2, 2]
}));
model.add(tf.layers.flatten());
model.add(tf.layers.dropout({rate: 0.25}));
model.add(tf.layers.dense({units: 512, activation: 'relu'}));
model.add(tf.layers.dropout({rate: 0.5}));
model.add(tf.layers.dense({
  units: 45,
  kernelInitializer: 'VarianceScaling',
  activation: 'softmax'
}));

// output has format of;
// 0 - 9 is player 1 health; 0 being less than 10%, 9 being full health.
// 10 - 19 is player 2 health; 10 being less than 10%, 19 being full health.
// 20 - 26 is distance between characters in number of keypresses; 20 being 0, 26 being 5.
// 27 - 28 is player 1 blocking; 27 is for high, 28 for low. If both zero not blocking.
// 29 - 30 is player 2 blocking; 29 is for high, 30 for low. If both zero not blocking.
// 31 - 35 is player 1 yPos; 31 is crouched, 32 is standing, 33 is jumping, 34 is knocked arial, 35 is too high to reach.
// 36 - 40 is player 2 yPos; 36 is crouched, 37 is standing, 38 is jumping, 39 is knocked arial, 40 is too high to reach.
// 41 is player 1 attacking.
// 42 is player 2 attacking.
// 43 is player 1 stunned.
// 44 is player 2 stunned.
// 45 is game over.

const optimizer = 'rmsprop';
model.compile({
  optimizer: optimizer,
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy'],
});

module.exports = model;
