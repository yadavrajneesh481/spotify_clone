const mongoose = require("mongoose");
const Song = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  thumbnail: {
    type: String,
    require: true,
  },
  track: {
    type: String,
    require: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const SongModel = mongoose.model("song", Song);
module.exports = SongModel;
