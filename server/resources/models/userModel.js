const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
      },
      message: "Invalid email format",
    },
  },
  age: {
    type: Number,
    required: true,
    min: 13,
  },
  password: {
    type: String,
    required: true,
  },
  secretKey: {
    type: String,
    default: null,
  },
  linkedin: {
    type: String,
    default: "",
  },
  instagram: {
    type: String,
    default: "",
  },
  facebook: {
    type: String,
    default: "",
  },
  codeConfirmed: {
    type: Boolean,
    default: false,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  userNotifications: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "notifications",
    },
  ],
  reportedIncidents: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "incidents",
    },
  ],
});

module.exports = mongoose.model("users", UserSchema);
