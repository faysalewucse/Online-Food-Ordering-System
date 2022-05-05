const crypto = require("crypto");
const Restaurent = require("../models/Restaurents");
const User = require("../models/User");
const Rider = require("../models/RiderSchema");
const ErrorResponse = require("../utils/errorResponse");
const sendEmail = require("../utils/sendEmail");
const mongoose = require("mongoose");

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
      sendToken(user, 401, res);
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

exports.riderlogin = async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password is provided
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password", 400));
  }

  try {
    // Check that user exists by email
    const rider = await Rider.findOne({ email }).select("+password");

    if (!rider) {
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    // Check that password match
    const isMatch = await rider.matchPassword(password);

    if (!isMatch) {
      sendToken(rider, 401, res);
      return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendToken(rider, 201, res);
  } catch (err) {
    next(err);
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

exports.register = async (req, res, next) => {
  const { name, email, address, phone, password, lattitude, longitude } =
    req.body;

  try {
    const user = await User.create({
      name,
      email,
      lattitude,
      longitude,
      address,
      phone,
      password,
    });

    sendToken(user, 201, res);
  } catch (err) {
    next(err);
  }
};

exports.rider_register = async (req, res, next) => {
  const { name, email, vehicle, address, password, lattitude, longitude } =
    req.body;

  try {
    const rider = await Rider.create({
      name,
      email,
      vehicle,
      lattitude,
      longitude,
      address,
      password,
      availibility: "false",
    });

    sendToken(rider, 201, res);
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
            sold: 0,
            rating: {
              star: 0,
            },
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

    sendToken(restaurent, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.up_status_user = async (req, res, next) => {
  const { order_id, user_mail, delivery_time, rider_mail, time } = req.body;
  const eventEmitter = req.app.get("eventEmitter");
  eventEmitter.emit("orderUpdated", {
    id: order_id,
    status: "Cooking",
    time: delivery_time,
  });
  try {
    const user = await User.findOneAndUpdate(
      {
        email: user_mail,
        "my_orders.order_id": `${order_id}`,
      },
      {
        $set: {
          "my_orders.$.status": "Cooking",
          "my_orders.$.delivery_time": delivery_time,
          "my_orders.$.rider_mail": rider_mail,
          "my_orders.$.time": time,
        },
      }
    );

    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.up_status_restaurent = async (req, res, next) => {
  const { order_id, res_mail, delivery_time, rider_mail, time } = req.body;

  try {
    const restaurent = await Restaurent.findOneAndUpdate(
      {
        res_email: res_mail,
        "orders.order_id": `${order_id}`,
      },
      {
        $set: {
          "orders.$.status": "Cooking",
          "orders.$.delivery_time": delivery_time,
          "orders.$.rider_mail": rider_mail,
          "orders.$.time": time,
        },
      }
    );

    sendToken(restaurent, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.update_rider_orders = async (req, res, next) => {
  const {
    order_id,
    rider_mail,
    result,
    res_name,
    user_name,
    user_email,
    user_phone,
    res_address,
    user_address,
    user_latlong,
    res_latlong,
  } = req.body;
  // const eventEmitter = req.app.get("eventEmitter");
  // eventEmitter.emit("orderUpdated", {
  //   id: order_id,
  //   status: "Cooking",
  //   time: delivery_time,
  // });
  try {
    const rider = await Rider.findOneAndUpdate(
      {
        email: rider_mail,
      },
      {
        $push: {
          my_orders: {
            order_id: order_id,
            user_name: user_name,
            user_email: user_email,
            user_phone: user_phone,
            user_address: user_address,
            res_name: res_name,
            res_address: res_address,
            user_latlong: user_latlong,
            res_latlong: res_latlong,
            status: "notcompleted",
            result: result,
          },
        },
      }
    );

    res.status(201).send(rider);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.up_status_user_deli = async (req, res, next) => {
  const { order_id, user_mail, status } = req.body;

  console.log(req.body);

  const eventEmitter = req.app.get("eventEmitter");
  eventEmitter.emit("orderUpdated", {
    id: order_id,
    status: status,
  });

  // eventEmitter.emit("userOrder", {
  //   email: user_mail,
  //   status: status,
  // });

  try {
    const user = await User.findOneAndUpdate(
      {
        email: user_mail,
        "my_orders.order_id": `${order_id}`,
      },
      {
        $set: {
          "my_orders.$.status": status,
        },
      }
    );
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.updatestatus_rider = async (req, res, next) => {
  const { order_id, rider_email, status } = req.body;

  try {
    const rider = await Rider.findOneAndUpdate(
      {
        email: rider_email,
        "my_orders.order_id": `${order_id}`,
      },
      {
        $set: {
          "my_orders.$.status": status,
        },
      }
    );
    res.status(201).send(rider);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.up_status_restaurent_deli = async (req, res, next) => {
  const { order_id, res_mail, status } = req.body;

  try {
    const restaurent = await Restaurent.findOneAndUpdate(
      {
        res_email: res_mail,
        "orders.order_id": `${order_id}`,
      },
      {
        $set: {
          "orders.$.status": status,
        },
      }
    );

    res.status(201).send(restaurent);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.rider_avail_update = async (req, res, next) => {
  const { rider_mail, status } = req.body;

  console.log(status);
  try {
    const rider = await Rider.findOneAndUpdate(
      {
        email: rider_mail,
      },
      {
        $set: {
          availibility: status,
        },
      }
    );
    const eventEmitter = req.app.get("eventEmitter");
    eventEmitter.emit("riderAvail", {
      status: rider,
    });
    sendToken(rider, 201, res);
  } catch (error) {
    console.log("Error");
    res.status(400).send(error.message);
  }
};

exports.update_review_status = async (req, res, next) => {
  const { order_id, user_mail } = req.body;

  // const eventEmitter = req.app.get("eventEmitter");
  // eventEmitter.emit("orderUpdated", {
  //   id: order_id,
  //   status: "Delivered",
  // });

  try {
    const user = await User.findOneAndUpdate(
      {
        email: user_mail,
        "my_orders.order_id": `${order_id}`,
      },
      {
        $set: {
          "my_orders.$.reviewed": "true",
        },
      }
    );
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
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

exports.getAllUser = async (req, res, next) => {
  try {
    const files = await User.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.increase_item_sell = async (req, res, next) => {
  const { food_id, res_email, sold } = req.body;

  console.log(req.body);

  try {
    const files = await Restaurent.updateOne(
      { res_email: res_email, "items._id": food_id },
      { $set: { "items.$.sold": sold } }
    );
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.get_res = async (req, res, next) => {
  const { res_mail } = req.body;
  try {
    const files = await Restaurent.findOneAndUpdate({ res_email: res_mail });
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.get_order_state = async (req, res, next) => {
  try {
    const files = await Restaurent.find({
      res_email: req.query.res_email,
    });
    res.status(200).send(files);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.getAllRider = async (req, res, next) => {
  try {
    const files = await Rider.find();
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
  const {
    email,
    food_id,
    food_name,
    food_price,
    img_path,
    res_email,
    res_name,
    res_address,
    latlong,
  } = req.body;

  console.log("ITEMS", req.body);
  try {
    const user = await User.findOneAndUpdate(
      {
        email: email,
      },
      {
        $push: {
          cart: {
            food_id: food_id,
            food_name: food_name,
            food_price: food_price,
            img_path: img_path,
            res_email: res_email,
            res_name: res_name,
            res_address: res_address,
            latlong: latlong,
          },
        },
      }
    );
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.postreview = async (req, res, next) => {
  const { res_email, food_id, review, rating } = req.body;
  try {
    const restaurent = await Restaurent.findOneAndUpdate(
      {
        res_email: res_email,
        "items._id": `${food_id}`,
      },
      {
        $push: {
          "items.$.reviews": { review: review, reply: "" },
          "items.$.rating": { star: rating },
        },
      }
    );

    sendToken(restaurent, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.add_order_history = async (req, res, next) => {
  const { data, result, user_mail, res_email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      {
        email: user_mail,
      },
      {
        $push: {
          my_orders: {
            order_id: data,
            res_email: res_email,
            result: result,
            status: "",
            reviewed: "false",
          },
        },
      }
    );
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.confirmorder = async (req, res, next) => {
  const { user, res_email, result } = req.body;

  const eventEmitter = req.app.get("eventEmitter");
  eventEmitter.emit("myorderUpdated", {
    email: user.email,
    status: "Confirm",
  });

  const commentId = new mongoose.Types.ObjectId();
  try {
    const restaurent = await Restaurent.findOneAndUpdate(
      {
        res_email: res_email,
      },
      {
        $push: {
          orders: {
            order_id: commentId,
            user: user,
            result: result,
            status: "Confirm",
          },
        },
      }
    );

    res.status(200).send(commentId);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.removefromcart = async (req, res, next) => {
  const { email, food_name, food_price, img_path, res_email } = req.body;

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
    sendToken(restaurent, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.emptycart = async (req, res, next) => {
  const { user_mail } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      {
        email: user_mail,
      },
      { $set: { cart: [] } },
      { multi: true }
    );
    sendToken(user, 201, res);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};
