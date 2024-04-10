const mongoose = require("mongoose")
const Playlist = new mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    thumbnail:{
        type:String,
        require:true,
    },
    
    owner:{
        type:mongoose.Types.ObjectId,
        ref:"user",
    },
    songs:[
        {
            type:mongoose.Types.ObjectId,
            ref:"song",
          
        },
    ],
    collaborators:[
        {
            type: mongoose.Types.ObjectId,
            ref:"user"
        }
    ]
})

const PlaylistModel = mongoose.model("playlist",Playlist);
module.exports = PlaylistModel;