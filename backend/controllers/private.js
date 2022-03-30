exports.getPrivateRoute = (req, res, next) => {
  console.log(req.user);
  res.status(200).json({
    success: true,
    data: req.user,
  });
};

exports.getResRoute = (req, res, next) => {
  res.status(200).json({
    success: true,
    data: req.restaurent,
  });
};
