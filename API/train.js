var mongoose = require("mongoose");
var TrainSchema = new mongoose.Schema({
  input: {
    type: Object,
    required: true
  },
  output: {
    type: Object,
    required: true
  }
})

var Train = mongoose.model("Train", TrainSchema);
module.exports = Train;
