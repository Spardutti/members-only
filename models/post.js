const mongoose = require("mongoose");
const { DateTime } = require("luxon");
const moment = require("moment");

const Schema = mongoose.Schema;

let PostSchema = new Schema(
  {
    title: { type: String, required: true },
    text: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);


PostSchema.virtual("timeago").get(function () {
  return moment(DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATETIME_MED)).fromNow();
})

PostSchema.virtual("url").get(function () {
  return "/delete/" + this._id;
})

module.exports = mongoose.model("Post", PostSchema);
