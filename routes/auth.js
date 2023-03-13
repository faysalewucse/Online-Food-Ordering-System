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
  getAllUser,
  up_status_user_deli,
  up_status_restaurent_deli,
  postreview,
  update_review_status,
  rider_register,
  riderlogin,
  getAllRider,
  update_rider_orders,
  rider_avail_update,
  get_order_state,
  updatestatus_rider,
  increase_item_sell,
  get_res,
  get_rider,
  update_user_name,
  addPost,
  makestatustrue,
} = require("../controllers/auth");

router.route("/register").post(register);
router.route("/rider_register").post(rider_register);
// router.route("/resregister").post(resregister);
router.route("/login").post(login);
router.route("/riderlogin").post(riderlogin);
router.route("/reslogin").post(reslogin);
router.route("/resregister").post(resregister);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword").put(resetpassword);
router.route("/makestatustrue").put(makestatustrue);

router.route("/updatefood").put(upload.single("file"), updatefood);
router.route("/update_user_name").put(update_user_name);
router.route("/deletefood").put(deletefood);
router.route("/updatestatus_user").put(up_status_user);
router.route("/updatestatus_restaurent").put(up_status_restaurent);
router.route("/update_rider_orders").put(update_rider_orders);
router.route("/updatestatus_user_deli").put(up_status_user_deli);
router.route("/updatestatus_rider").put(updatestatus_rider);
router.route("/rider_avail_update").put(rider_avail_update);
router.route("/update_review_status").put(update_review_status);
router.route("/updatestatus_restaurent_deli").put(up_status_restaurent_deli);
router.route("/afterconfirm_removecart").put(emptycart);
router.route("/increase_item_sell").put(increase_item_sell);
router.route("/addtocart").post(addtocart);
router.route("/postreview").post(postreview);
router.route("/afterremovecart_deliverystatus").post(add_order_history);
router.route("/confirmorder").post(confirmorder);
router.route("/removefromcart").post(removefromcart);
router.route("/reducefromcart").post(reducefromcart);

router.post("/addfood", upload.single("file"), addfood);
router.post("/addPost", upload.array("images", 5), addPost);

router.get("/getallres", getAllRes);
router.post("/get_res", get_res);
router.post("/get_rider", get_rider);
router.get("/get_order_state", get_order_state);
router.get("/getalluser", getAllUser);
router.get("/getallrider", getAllRider);
router.post("/getresfood", getresfood);

module.exports = router;
