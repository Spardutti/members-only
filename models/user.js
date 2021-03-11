const mongoose = require("mongoose");

const Schema = mongoose.Schema;

let UserSchema = new Schema({
  firstName: { type: String, required: true, maxlength: 50 },
  lastName: { type: String, required: true, maxlength: 50 },
  username: { type: String, required: true },
  password: { type: String, required: true },
  isVip: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
});


//virtual full name
UserSchema.virtual("fullname").get(function () {
    return `${this.firstName} ${this.lastName}`
})

module.exports = mongoose.model("User", UserSchema);