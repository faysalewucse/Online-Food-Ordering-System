const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  register,
  login,
  forgotpassword,
  resetpassword,
  resregister,
  reslogin,
  addfood,
  updatefood,
  deletefood,
  getAllRes,
  getresfood,
  addtocart,
  removefromcart,
  reducefromcart,
} = require("../controllers/auth");

router.route("/register").post(register);
// router.route("/resregister").post(resregister);
router.route("/login").post(login);
router.route("/reslogin").post(reslogin);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/updatefood").put(upload.single("file"), updatefood);
router.route("/deletefood").put(deletefood);
router.route("/addtocart").post(addtocart);
router.route("/removefromcart").post(removefromcart);
router.route("/reducefromcart").post(reducefromcart);

router.post("/addfood", upload.single("file"), addfood);
router.post("/resregister", upload.single("file"), resregister);

router.get("/getallres", getAllRes);
router.post("/getresfood", getresfood);

module.exports = router;
