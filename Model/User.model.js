const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", UserSchema);

module.exports = {
  UserModel,
};

