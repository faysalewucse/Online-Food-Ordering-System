const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Provide a Name"],
  },
  email: {
    type: String,
    required: [true, "Please Provide a Email"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
  },
  address: {
    type: String,
    required: [true, "Please add a Address"],
  },
  phone: {
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
  cart: [
    {
      food_id: {
        type: String,
      },
      food_name: {
        type: String,
      },
      food_price: {
        type: String,
      },
      img_path: {
        type: String,
      },
      res_email: {
        type: String,
      },
      res_name: {
        type: String,
      },
      res_address: { type: String },
      latlong: { type: String },
    },
  ],
  my_orders: [
    {
      order_id: {
        type: String,
      },
      res_email: {
        type: String,
      },
      res_address: {
        type: String,
      },
      result: {
        type: Object,
      },
      delivery_time: { type: String },
      rider_mail: { type: String },
      time: { type: String },
      status: {
        type: String,
      },
      reviewed: {
        type: String,
      },
    },
  ],
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.getResetPasswordToken = function () {
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
const User = mongoose.model("User", UserSchema);

module.exports = User;
