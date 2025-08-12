const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const passport = require("passport");
require("./auth/google"); // Load Google Strategy
const connectDB = require("./db/connect");

const verifyToken = require("./middlewares/verifyToken");
const healthRoute = require("./routes/health");
const authRoutes = require("./routes/auth");
const projectRoutes = require("./routes/project");
const dashboardRoutes = require("./routes/dashboard");
const sprintRoutes = require("./routes/sprint");
const taskRoutes = require("./routes/task");
const aiRoutes = require("./routes/ai");
const inviteRoutes = require("./routes/invites");
const userRoutes = require("./routes/user");
const noteRoutes = require("./routes/note");
const notificationRoutes = require("./routes/notification");

// const devRoutes = require("./routes/dev");

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const API_URL = process.env.API_URL;

connectDB();

app.use(express.json());
const allowedOrigins = [process.env.FRONTEND_URL, "https://pinghub.molla.dev"];
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true); // allow
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(passport.initialize());

app.use("/auth", authRoutes);
app.use("/health", healthRoute);

app.get("/", (req, res) => {
  res.send("Welcome to DevNest");
});
app.use(verifyToken);

app.use("/projects", projectRoutes);
app.use("/dashboard", dashboardRoutes);
app.use("/sprints", sprintRoutes);
app.use("/tasks", taskRoutes);
app.use("/ai", aiRoutes);
app.use("/invites", inviteRoutes);
app.use("/users", userRoutes);
app.use("/notes", noteRoutes);
app.use("/notifications", notificationRoutes);

// app.use("/dev", devRoutes);

app.listen(PORT, () => {
  console.log(`All good server is running on ${API_URL}`);
});
