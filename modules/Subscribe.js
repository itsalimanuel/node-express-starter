const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscribeSchema = new Schema({
  email: {
    type: String,
  },
});

const Subscribe = mongoose.model("Subscribe", subscribeSchema);
module.exports = Subscribe
