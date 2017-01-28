var mongoose  = require("mongoose"),
    shortId   = require("shortid");

var imageSchema = new mongoose.Schema({
    shortId:  {type: String, unique: true, default: shortId.generate},
    filename: String,
    created:  {type: Date, default: Date.now},
    author:
    {
      id:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      username: String
    }
});

module.exports = mongoose.model("Image", imageSchema);