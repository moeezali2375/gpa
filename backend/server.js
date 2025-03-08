const express = require("express");
require("dotenv").config();
require("./jobs/cleanup");
const connectDB = require("./config/db");
const homeRoutes = require("./routes/routes");
const authRoutes = require("./routes/authRoutes");
const protectRoutes = require("./routes/protectRoutes");
const semesterRoutes = require("./routes/semesterRoutes");
const gradeRoutes = require("./routes/gradeRoutes");
const stalkRoutes = require("./routes/stalkRoutes");
const { crossOrigin } = require("./middlewares/corsMiddleware");
const path = require("path");

const app = express();

//!Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
crossOrigin(app);
app.use("/api", homeRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/protect", protectRoutes);
app.use("/api/semester", semesterRoutes);
app.use("/api/grade", gradeRoutes);
app.use("/api/stalk", stalkRoutes);

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(
    express.static(path.join(path.dirname(__dirname1), "frontend", "dist")),
  );
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(path.dirname(__dirname1), "frontend", "dist", "index.html"),
    );
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is up and running!");
  });
}

app.get("*", (req, res) => res.redirect("/api"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log("Server Started on Port: " + PORT);
  connectDB();
});
