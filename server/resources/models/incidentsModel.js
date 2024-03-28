const mongoose = require("mongoose");

const IncidentSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "users",
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("incidents", IncidentSchema);
