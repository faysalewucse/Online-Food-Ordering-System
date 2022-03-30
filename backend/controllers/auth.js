const crypto = require("crypto");
const Restaurent = require("../models/Restaurents");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");

exports.register = async (req, res, next) => {
  const { name, email, address, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      address,
      password,
    });

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};
exports.resregister = async (req, res, next) => {
  const {
    name,
    res_name,
    res_email,
    res_address,
    lattitude,
    longitude,
    res_password,
  } = req.body;

  const res_img = req.file.originalname;
  const res_img_path = req.file.path;

  const resExist = await Restaurent.findOne({ res_email });

  if (resExist) {
    res.status(404);
    throw new Error("Email already exists");
  }

  try {
    const restaurent = await Restaurent.create({
      name,
      res_name,
      res_email,
      res_address,
      lattitude,
      longitude,
      res_password,
      res_img,
      res_img_path,
    });

    restaurent.save();

    sendToken(restaurent, 201, res);
  } catch (err) {
    console.log(err);
    next(err);
  }
};
exports.addfood = async (req, res, next) => {
  const { res_email, food_name, food_price } = req.body;
  const food_img = req.file.originalname;
  const img_path = req.file.path;

  try {
    const restaurent = await Restaurent.findOneAndUpdate(
      {
        res_email: res_email,
      },
      {
        $push: {
          items: {
            food_img: food_img,
            food_name: food_name,
            food_price: food_price,
            img_path: img_path,
          },
        },
      }
    );
    sendToken(restaurent, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.updatefood = async (req, res, next) => {
  const { res_email, food_name, food_price, food_id } = req.body;

  try {
    const restaurent = await Restaurent.findOneAndUpdate(
      {
        res_email: res_email,
        "items._id": `${food_id}`,
      },
      {
        $set: {
          "items.$.food_name": food_name,
          "items.$.food_price": food_price,
        },
      }
    );
    //console.log(restaurent);
    sendToken(restaurent, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 201, res);
  } catch (err) {
    res.status(500).json({ success: false, error: "Invalid Cridentials" });
  }
};

exports.reslogin = async (req, res, next) => {
  const { res_email, res_password } = req.body;

  // Check if email and password is provided
  if (!res_email || !res_password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const restaurent = await Restaurent.findOne({ res_email }).select(
      "+res_password"
    );

    if (!restaurent) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await restaurent.matchPassword(res_password);

    if (!isMatch) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(restaurent, 201, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "Invalid Cridentials" });
  }
};

exports.forgotpassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No email could not be sent", 404));
    }

    console.log(user);
    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    // Create reset url to email to provided email
    const resetUrl = `http://localhost:3000/passwordreset/${resetToken}`;

    // HTML Message
    const message = `
    <h1>You have requested a password reset</h1>
    <p>Please make a put request to the following link:</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      const from = "faysal.ewucse@gmail.com";
      const to = email;

      const subject = "Reset FoodsBD Password";
      await sendEmail(to, from, subject, message);

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};

exports.resetpassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    console.log(user.password);
    console.log(user);

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};
exports.getAllRes = async (req, res, next) => {
  try {
    const files = await Restaurent.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getresfood = async (req, res, next) => {
  try {
    const res_email = req.body.res_email;

    const files = await Restaurent.findOne({ res_email });

    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.addtocart = async (req, res, next) => {
  const { email, food_name, food_price, img_path, res_email } = req.body;

  console.log(img_path);
  try {
    const user = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        $push: {
          cart: {
            food_name: food_name,
            food_price: food_price,
            img_path: img_path,
            res_email: res_email,
          },
        },
      }
    );
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.removefromcart = async (req, res, next) => {
  const { email, food_name, food_price, img_path, res_email } = req.body;

  console.log(img_path);
  try {
    const user = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        $pull: {
          cart: { img_path: { $in: img_path } },
        },
      }
    );
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.reducefromcart = async (req, res, next) => {
  const { email, food_id } = req.body;

  console.log("I M Working");

  try {
    const user = await User.findOneAndUpdate(
      {
        email: email,
      },

      {
        $pull: { cart: { _id: food_id } },
      },
      { multi: false } // Multi
    );
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.deletefood = async (req, res, next) => {
  const { res_email, food_id } = req.body;

  console.log(req.body);
  try {
    const restaurent = await Restaurent.findOneAndUpdate(
      {
        res_email: res_email,
      },
      {
        $pull: {
          items: { _id: { $in: food_id } },
        },
      }
    );
    //console.log(restaurent);
    sendToken(restaurent, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};
