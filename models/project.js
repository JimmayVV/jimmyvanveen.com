// PROJECT model

var mongoose  = require("mongoose"),
    shortId   = require("shortid");

var projectSchema = new mongoose.Schema(
{
  shortId:  {type: String, unique: true, default: shortId.generate},
  title:    String,
  content:  String,
  started:  Date,
  finished: Date,
  current:  Boolean,
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
  // TODO: add skills used to the projects. Would like this to relate to other projects as well
});

module.exports = mongoose.model("Project", projectSchema);