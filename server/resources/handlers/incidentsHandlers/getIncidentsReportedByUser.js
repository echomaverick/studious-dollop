const User = require('../../models/userModel');
const Incidents = require('../../models/incidentsModel');

const getIncidentsReportedByUser = async (req, res) => {
    try {
        const userEmail = req.params.email;

        if (!userEmail) {
            console.error("User email is required"); 
            return res.status(400).json({ message: "User email is required" });
        }

        const user = await User.findOne({ email: userEmail }, '_id');

        if (!user) {
            console.error("User not found"); 
            return res.status(404).json({ message: "User not found" });
        }

        const userId = user._id;

        const incidents = await Incidents.find({ userId });

        return res.status(200).json({ incidents });
    } catch (error) {
        console.error("Error getting incidents reported by user:", error); 
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = getIncidentsReportedByUser;
