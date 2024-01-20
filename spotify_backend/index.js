const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(express.json());
const cors = require("cors");
const authRoutes = require("./routes/auth");
const songRoutes = require("./routes/Song");
const playlistRoutes = require("./routes/playlist");
const User = require("./models/user");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
require("dotenv").config();
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://mca22yadavrajneeshdharmendra:" +
      process.env.MONGO_PASSWORD +
      "@cluster0.hd5y67j.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "9049113166Raj@$";
passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findOne({ id: jwt_payload.sub })
      .then((user) => {
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);

app.get("/", (req, res) => {
  res.send("Hello");
});

app.use("/auth", authRoutes);
app.use("/song", songRoutes);
app.use("/playlist", playlistRoutes);

app.listen(port, () => {
  console.log("App is running on port " + port);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(401).json({ error: "Unauthorized" });
});
