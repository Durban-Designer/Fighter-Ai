var express = require("express");
var mongodb = require("mongodb");
var _ = require("lodash");
var bodyParser = require("body-parser");
var app = express();
var router = express.Router();
var mongoose = require("mongoose");
var Brain = mongoose.model("Brain");
var Train = mongoose.model("Train");

app.use(bodyParser.json());

router.post("/", (req,res) => {
  Brain.findOne({'name': req.body.name}, function (err, brain) {
    if (brain === null) {
      var newBrain = new Brain({
        name: req.body.name,
        brain: req.body.brain
      })

      newBrain.save((err, result) => {
        if(err) {
          res.send(err);
        } else {
          res.send(result);
        }
      });
    } else {
      res.send('name already taken');
    }
  })
})

router.post("/training", (req,res) => {
  var newTrain = new Train({
    input: req.body.input,
    output: req.body.output
  })

  newBrain.save((err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
})

router.get("/", (req, res) => {
  var pageNum = req.params["page"] || 1;
  Brain
  .find()
  .exec(function (err, brains) {
    if (err) {
      res.send(err);
    } else {
      res.send(brains);
    }
  })
})

router.get("/training", (req, res) => {
  var pageNum = req.params["page"] || 1;
  Train
  .find({}, function (err, trainingData) {
    if (err) {
      res.send(err);
    } else {
      res.send(trainingData);
    }
  })
})

router.get("/:name", (req, res) => {
  var title = req.params.name;
  Brain.find({"name": title},function (err, brain) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(brain);
    }
  });
})

router.put("/:id", (req, res) => {
  var title = req.params.id;
  Brain.find({"_id": title},function (err, brain) {
    if (err) {
      res.status(500).send(err);
    } else {
      var brain = brain[0];
      brain.name = req.body.name || brain.name;
      brain.brain = req.body.brain || brain.brain;
      brain.save(function (err, brain) {
        if (err) {
          console.log('saveerror' + err)
          res.status(500).send(err)
        }
        res.send(brain);
      });
    }
  });
})

router.delete("/:id", (req, res) => {
  var brainid = new mongodb.ObjectID(req.params["id"]);
  Brain.find({_id: brainid}).remove().then(() => {
    res.send("success");
  })
})

router.delete("/training/:id", (req, res) => {
  var trainid = new mongodb.ObjectID(req.params["id"]);
  Train.find({_id: trainid}).remove().then(() => {
    res.send("success");
  })
})

module.exports = router;
