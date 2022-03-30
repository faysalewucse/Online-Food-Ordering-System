const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RestaurentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Name"],
  },
  res_name: {
    type: String,
    required: [true, "Please Provide a Restaurent Name"],
  },
  res_email: {
    type: String,
    required: [true, "Please Provide a Email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  res_address: {
    type: String,
    required: [true, "Please add a Address"],
  },
  lattitude: {
    type: String,
    required: [true, "Please add a Lattitude"],
  },
  longitude: {
    type: String,
    required: [true, "Please add a Longitude"],
  },
  res_password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  res_img: {
    type: String,
  },
  res_img_path: {
    type: String,
  },
  sold: {
    type: String,
  },
  items: [
    {
      food_img: {
        type: String,
      },
      food_name: {
        type: String,
        required: true,
      },
      food_price: {
        type: String,
        required: true,
      },
      img_path: {
        type: String,
      },
    },
  ],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

RestaurentSchema.pre("save", async function (next) {
  if (!this.isModified("res_password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.res_password = await bcrypt.hash(this.res_password, salt);
  next();
});

RestaurentSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.res_password);
};

RestaurentSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

RestaurentSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  return resetToken;
};

const Restaurent = mongoose.model("Restaurent", RestaurentSchema);

module.exports = Restaurent;
