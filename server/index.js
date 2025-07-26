const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
require("./auth/google"); // Load Google Strategy
const connectDB = require("./db/connect");

const verifyToken = require("./middlewares/verifyToken");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const dashboardRoutes = require("./routes/dashboard");
const sprintRoutes = require("./routes/sprint");
const taskRoutes = require("./routes/task");
const devRoutes = require("./routes/dev");

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

connectDB();

app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(passport.initialize());

app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to DevNest");
});
app.use(verifyToken);

app.use("/projects", projectRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/sprints", sprintRoutes);
app.use("/tasks", taskRoutes);
app.use("/dev", devRoutes);

app.listen(PORT, () => {
  console.log(`All good server is running on ${API_URL}`);
});
