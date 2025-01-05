import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import leadRoutes from "./routes/leadRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import interactionRoutes from "./routes/interactionRoutes.js";
import callScheduleRoutes from "./routes/callScheduleRoutes.js";
import "./models/associations.js";

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Enable CORS for all routes
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow all methods
    allowedHeaders: ["Content-Type", "Authorization", "*"], // Allow all headers
  })
);

// Routes
app.use("/leads", leadRoutes); // Use lead routes
app.use("/contacts", contactRoutes); // Use contact routes
app.use("/interactions", interactionRoutes); // Use interaction routes
app.use("/call-schedules", callScheduleRoutes); // Use the call schedule routes

// Sync database models
sequelize
  .sync({ force: false }) // Use force: true only in development to drop and recreate the tables
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Error syncing database:", error);
  });

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
