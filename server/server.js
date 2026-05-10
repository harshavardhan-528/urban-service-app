const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const otpRoutes =
  require("./routes/otpRoutes");

const app = express();


// Middleware
app.use(cors());

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/otp", otpRoutes);


// Test Route
app.get("/", (req, res) => {

  res.send("API Running...");

});


// Debug Mongo URI
console.log(
  "Mongo URI:",
  process.env.MONGO_URI
);


// MongoDB Connection
mongoose.connect(

  process.env.MONGO_URI,

  {
    tls: true,
  }

)
.then(() => {

  console.log("MongoDB Connected");

})
.catch((err) => {

  console.log(err);

});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});