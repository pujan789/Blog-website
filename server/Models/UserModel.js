const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { faker } = require('@faker-js/faker');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  avatar: {
    type: String,
    default: () => faker.image.avatar(), // Use faker to generate a random avatar

  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],
  createdAt: {
    type: Date,
    default: Date.now, // Use Date.now for default date
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
