var mongoose = require("mongoose");
var BrainSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brain: {
    type: Object,
    required: true
  }
})

var Brain = mongoose.model("Brain", BrainSchema);
module.exports = Brain;
