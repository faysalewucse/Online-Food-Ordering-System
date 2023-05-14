import React, { useRef } from "react";
import "../css/Cart.css";
import CartCard from "../cards/CartCard";
import { confirmorder } from "../api/resdata";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

function Cart() {
  // Initialize variables
  // const [orderaddress, setOrderAddress] = useState(user.address);

  // Current user from redux store
  const { cartItems } = useSelector((state) => state.cart);

  const { user } = useSelector((state) => state.auth);

  const [open, setOpen] = React.useState(false);
  const form = useRef();

  const handleClose = () => {
    setOpen(false);
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    const data = await confirmOrder(result);
    if (data) {
      emailjs
        .sendForm(
          process.env.REACT_APP_EMAILJS_SERVICE_ID,
          process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
          form.current,
          process.env.REACT_APP_EMAILJS_PUBLIC_KEY
        )
        .then(
          (result) => {
            navigate("/myorders");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  const navigate = useNavigate();
  let cartItem,
    result,
    totalCost = 0,
    res_name,
    res_email,
    res_address;

  if (cartItems) {
    result = [
      ...cartItems
        .reduce((mp, o) => {
          if (!mp.has(o.img_path)) mp.set(o.img_path, { ...o, count: 0 });
          mp.get(o.img_path).count++;
          return mp;
        }, new Map())
        .values(),
    ];

    if (result) {
      result.forEach((item) => {
        totalCost += item.food_price * item.count;
        res_name = item.res_name;
        res_email = item.res_email;
        res_address = item.res_address;
      });
    }

    cartItem = result.map((item, index) => {
      return <CartCard key={index} {...item} />;
    });
  }

  const confirmOrder = async (result) => {
    if (!user) return navigate("/login");
    const data = await confirmorder(
      user.email,
      user,
      res_email,
      res_address,
      result
      // setCartCount
    );
    return data;
  };

  return (
    <div className="py-5 bg-gray-100">
      <h2 className="text-center mb-5">
        {/* Ordered {cart_count} Items From {res_name} */}
      </h2>
      <div className="max-w-7xl mx-auto flex gap-5 justify-between">
        {totalCost !== 0 ? (
          <div className="w-1/2">{cartItem}</div>
        ) : (
          <div className="w-1/2">
            <div className="text-center">
              <img src="images/cart-empty.svg" alt="cart-empty" />
              <h3 className="text-center cart-empty-text">
                Your Cart Is Empty
              </h3>
              <h6 className="text-center cart-empty-text mb-5">
                Please Add Some Food and Order
              </h6>
            </div>
          </div>
        )}

        <div className="col-lg-6">
          <div className="bg-zinc-800 p-5 rounded text-white">
            <h2>Cost</h2>
            <hr />
            <div className="d-flex justify-content-between">
              <h6>Restaurent Name :</h6>
              <h6 className="text-green text-lg font-bold">{res_name}</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Sub Total :</h6>
              <h6>{totalCost} BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Delivery Charge :</h6>
              <h6>15 BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Discount :</h6>
              <h6>00 BDT</h6>
            </div>
            <div className="d-flex justify-content-between">
              <h6>Total :</h6>
              <h6>
                {parseInt(totalCost) === 0 ? totalCost : totalCost + 15} BDT
              </h6>
            </div>
            <div className="flex justify-between items-center">
              {totalCost !== 0 ? (
                <h6 className="mt-2 bg-green hover:bg-greenHover cursor-pointer py-2 px-6 rounded">
                  Apply Voucher
                </h6>
              ) : (
                <h6 className="mt-2 disabled">Apply Voucher</h6>
              )}
              <input
                className="focus:outline-none p-2 font-bold"
                type="text"
                placeholder="ex: FOOD2023"
              />
              <textarea hidden name="message" defaultValue={"OP"} />
            </div>
            {totalCost !== 0 ? (
              <h6
                className="mt-5 bg-green hover:bg-greenHover cursor-pointer text-center p-2"
                onClick={() => (user ? setOpen(true) : navigate("/login"))}
              >
                Confirm Order
              </h6>
            ) : (
              <h6 className="mt-5 bg-gray-400 text-gray-300 text-center p-2 disabled cursor-not-allowed">
                Confirm Order
              </h6>
            )}
          </div>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Order Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you Sure to Confirm Order from ? {res_name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: "red" }} onClick={handleClose}>
            Cancel
          </Button>
          <form ref={form} onSubmit={sendEmail}>
            <div className="input-box">
              <input type="hidden" name="user_name" defaultValue={"User"} />
            </div>
            <div className="input-box">
              <input type="hidden" name="user_email" defaultValue={"Email"} />
            </div>
            <div className="input-box message-box">
              <textarea
                hidden
                type="text"
                name="message"
                defaultValue={"Your Order has been placed"}
              />
            </div>

            <input
              style={{ border: "none" }}
              className="final-confirm-btn"
              type="submit"
              value="Confirm Order"
            />
          </form>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Cart;
