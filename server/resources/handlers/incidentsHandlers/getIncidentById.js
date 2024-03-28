const Incident = require("../../models/incidentsModel");

const getIncidentById = async (req, res) => {
  try {
    const incidentId = req.params.id;

    if (!incidentId) {
      return res.status(400).json({ message: "Incident ID is required." });
    }
    const incident = await Incident.findById(incidentId);

    if (!incident) {
      return res.status(404).json({ message: "Incident not found." });
    }

    return res.status(200).json({ incident });
  } catch (error) {
    console.error("Error getting Incident by ID:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getIncidentById;
