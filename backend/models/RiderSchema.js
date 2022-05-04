const crypto = require("crypto");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const RiderSchema = new mongoose.Schema({
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
  vehicle: {
    type: String,
    required: [true, "Please add a Vehicle"],
  },
  availibility: {
    type: String,
  },
  address: {
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
  my_orders: [
    {
      order_id: { type: String },
      user_name: {
        type: String,
      },
      user_email: {
        type: String,
      },
      user_phone: {
        type: String,
      },
      user_address: {
        type: String,
      },
      res_name: {
        type: String,
      },
      res_address: {
        type: String,
      },
      user_latlong: {
        type: String,
      },
      res_latlong: {
        type: String,
      },
      result: {
        type: Object,
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

RiderSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

RiderSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

RiderSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

RiderSchema.methods.getResetPasswordToken = function () {
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
const User = mongoose.model("Rider", RiderSchema);

module.exports = User;
