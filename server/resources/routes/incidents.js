const express = require("express");
const createIncident = require("../handlers/incidentsHandlers/createIncident");
const deleteIncident = require("../handlers/incidentsHandlers/deleteIncident");
const getAllIncidents = require("../handlers/incidentsHandlers/getAllIncidents");
const getIncidentById = require("../handlers/incidentsHandlers/getIncidentById");
const getIncidentsReportedByUser = require("../handlers/incidentsHandlers/getIncidentsReportedByUser");
const rateLimit = require("express-rate-limit");

const router = express.Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

router.use(limiter);

router.get("/incidents", getAllIncidents);
router.get("/incidents/:email", getIncidentsReportedByUser);
router.get("/incident/:id", getIncidentById);
router.post("/create-incident/:email", createIncident);
router.delete("/delete-incident", deleteIncident);

module.exports = router;
