const express = require("express");
const http = require("http");
const connectDB = require("./resources/config/dbConfig");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./resources/routes/user");
const incidents = require("./resources/routes/incidents");
const key = require("./resources/routes/key");
const middleware = require("./resources/routes/middleware");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 5100;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api", users);
app.use("/api", incidents);
app.use("/api", key);
app.use("/api", middleware);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Server listen
const listener = server.listen(PORT, () => {
  console.log(`Server started on port ${listener.address().port}`);
});

// Connect to database
connectDB();

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("Server shutting down...");
  listener.close(() => {
    console.log("Server shut down successfully.");
    process.exit(0);
  });
});
