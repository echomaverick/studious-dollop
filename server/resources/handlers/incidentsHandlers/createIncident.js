const mongoose = require("mongoose");
const Incident = require("../../models/incidentsModel");
const User = require("../../models/userModel");

const createIncident = async (req, res) => {
  try {
    const { message, latitude, longitude } = req.body;
    const userEmail = req.params.email;

    if (!message || !latitude || !longitude || !userEmail) {
      return res.status(400).json({
        message: "Message, latitude, longitude, and user email are required.",
      });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const newIncident = new Incident({
      message,
      latitude,
      longitude,
      userId: user._id,
    });

    await newIncident.save();

    await User.findByIdAndUpdate(user._id, {
      $push: { reportedIncidents: newIncident._id },
    });

    const otherUsers = await User.find({
      reportedIncidents: newIncident._id,
      _id: { $ne: user._id },
    });

    return res.status(201).json({ incident: newIncident });
  } catch (error) {
    console.error("Error creating incident:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = createIncident;
