require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());
app.use(bodyParser.json());
//GOOGLE LOGIN
const userRoute = require("./auth/routes/googleRoute");
require("./auth/controllers/passport")(passport);
// Email $ phone login
const usersRoute = require("./auth/routes/userRoutes");
const hospitalRoutes = require("./hospital/routes/hospital");
const doctorRouter = require("./pharmcay/routes/doctorRouter");
//Db
mongoose.connect(
  "mongodb+srv://userProfiles:MoBohTt3PGtlsyCy@cluster0.nx0ry.mongodb.net/eHospiDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: "true",
  }
);
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});
app.use("/", userRoute);
app.use("/api", usersRoute);
app.use("/api", hospitalRoutes);
app.use("/api", doctorRouter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server is running on: " + PORT));
