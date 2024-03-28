const Incident = require("../../models/incidentsModel");

const getAllIncidents = async (req, res) => {
  try {
    const incidents = await Incident.find();

    return res.status(200).json({ incidents });
  } catch (error) {
    console.error("Error getting all incidents", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getAllIncidents;
