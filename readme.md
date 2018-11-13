# Mugen Fighter AI

## Warning still in Alpha / Heavy development

This is an attempt to use tensorflow.js to apply labels to the Mugen fighting games screens in real time allowing a Brain.js bot to decide on a combo string to execute. The idea is to have a few stages in each loop, Observe the screen by taking a photo, Analyze the photo to determine key data such as player health, opponent health, positioning, whether the opponent is guarding high or low, and whether you can execute another attack in this frame. Then use this data to inform another Neural Network which is trained to assign combo string labels / movement to this input data. These combo strings are then dispatched to the virtual keyboard before we loop back to the observation phase.

## Getting Started

These instructions will give a basic idea of how to run the various utilities I've developed for acquiring training data, training models, and deploying models. I've also included Mugen since it is open source for the ease of getting everything up and running yourself.

### Prerequisites

You'll need to use Node to both install and run this project, as well i've only included the windows version of Mugen.
You must run Mugen and the main screen at 800X600 for this to work, even at that low of a resolution we still can barely pull 5-8fps on a good day.

### Installing

Install dependencies

```
npm install
```

### Running

To Run the image capture module use;

```
node capture
```

To run the tensorFlow.js training module use;

```
node train-tensor
```

To run the Brain.js training module use;

```
node train-brain
```

To run the actual Bot use;

```
npm start
```

## Contributing
If you are interested in contributing please email me at Royce.Birnbaum@gmail.com

## Authors

* **Royce Birnbaum** - *Initial work* - [Durban-Designer](https://github.com/Durban-Designer)


## Acknowledgments

* Thank you to the Mugen Team
* Thank you Google for making Tensor Flow and writing great examples
