const mongoose = require("mongoose");

const planetsSchema = new moongoose.Schema({
  keplerName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("planetsSchema", planetsSchema);
