const tf = require('@tensorflow/tfjs');
const model = tf.sequential();
model.add(tf.layers.conv2d({
  inputShape: [800, 600, 3],
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
  units: 10,
  kernelInitializer: 'VarianceScaling',
  activation: 'softmax'
}));
const optimizer = 'rmsprop';
model.compile({
  optimizer: optimizer,
  loss: 'categoricalCrossentropy',
  metrics: ['accuracy'],
});

module.exports = model;
