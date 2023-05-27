import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../components/PrimaryButton";

export default function ConvenceRestaurants() {
  // instance of useNative
  const navigate = useNavigate();
  return (
    <div className="p-10 md:p-20">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex justify-between items-center">
          <div className="">
            <img className="" src="images/man-cooking.png" alt="healthy" />
          </div>
          <div className="md:w-1/2 text-center">
            <h1 className="">
              <b>Are you a Master of Cooking?</b>
            </h1>
            <p className="my-10">
              Would you like millions of new customers to enjoy your amazing
              food and groceries? So would we! It's simple: we list your menu
              and product lists online, help you process orders, pick them up,
              and deliver them to hungry pandas – in a heartbeat! Interested?
              Let's start our partnership today!
            </p>
            <PrimaryButton
              text={"Get Started"}
              onClickHandler={() => navigate("/restaurant-register")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
