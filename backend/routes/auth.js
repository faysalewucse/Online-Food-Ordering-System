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
  confirmorder,
  emptycart,
  add_order_history,
  up_status_user,
  up_status_restaurent,
} = require("../controllers/auth");

router.route("/register").post(register);
// router.route("/resregister").post(resregister);
router.route("/login").post(login);
router.route("/reslogin").post(reslogin);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);

router.route("/updatefood").put(upload.single("file"), updatefood);
router.route("/deletefood").put(deletefood);
router.route("/updatestatus_user").put(up_status_user);
router.route("/updatestatus_restaurent").put(up_status_restaurent);
router.route("/afterconfirm_removecart").put(emptycart);
router.route("/addtocart").post(addtocart);
router.route("/afterremovecart_deliverystatus").post(add_order_history);
router.route("/confirmorder").post(confirmorder);
router.route("/removefromcart").post(removefromcart);
router.route("/reducefromcart").post(reducefromcart);

router.post("/addfood", upload.single("file"), addfood);
router.post("/resregister", upload.single("file"), resregister);

router.get("/getallres", getAllRes);
router.post("/getresfood", getresfood);

module.exports = router;
