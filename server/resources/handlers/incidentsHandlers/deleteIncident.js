const mongoose = require("mongoose");
const Incident = require("../../models/incidentsModel");
const User = require("../../models/userModel");

const deleteIncident = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Id of the incident is: ", id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid incident ID." });
    }

    const incidentToDelete = await Incident.findById(id);

    if (!incidentToDelete) {
      return res.status(404).json({ message: "Incident not found." });
    }
    await Incident.findByIdAndUpdate(id, { deleted: true });

    
    await User.findByIdAndUpdate(incidentToDelete.userId, {
      $pull: { reportedIncidents: id },
    });

    return res.status(200).json({ message: "Incident marked as deleted." });
  } catch (error) {
    console.error("Error deleting incident:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = deleteIncident;
