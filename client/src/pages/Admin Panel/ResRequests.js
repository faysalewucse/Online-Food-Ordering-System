import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {
  useGetRestaurantsQuery,
  useMakeStatusTrueMutation,
} from "../../features/restaurant/restaurantApi";
import LoadingButton from "../../utils/LoadingButton";
import { ToastContainer, toast } from "react-toastify";
import PrimaryButton from "../../utils/PrimaryButton";

export default function ResRequests() {
  // Initialize variables
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const message =
    "Congratulations! We are pleased to inform you that your restaurant registration has been accepted for our online food delivery platform.\n\nWe are excited to have you onboard and look forward to working with you to provide our customers with the best dining experiences. Our platform is designed to help you reach a wider audience and grow your business.\n\nPlease log in to your account and start adding your menu items, setting up your delivery zones, and managing your orders. If you have any questions or need assistance with any aspect of the platform, please don't hesitate to contact our support team.\n\nThank you for choosing our platform to expand your business. We wish you all the best and look forward to a successful partnership.";
  const form = useRef();

  // modal visibility
  const [modalVisible, setModalVisibility] = useState(false);
  // get all restaurant requests from rtk
  const { data: restaurants, isLoading, error } = useGetRestaurantsQuery();
  const [makeStatusTrue, { data, isLoading: loading, error: responseError }] =
    useMakeStatusTrueMutation();

  // Restaurant accept handler function
  const acceptHandler = (name, email) => {
    setName(name);
    setEmail(email);
    setModalVisibility(true);
  };

  // Finallu confirm acceptance and send email
  const finalcceptHandler = async () => {
    await makeStatusTrue({ email });
    sendEmail();
  };

  const sendEmail = () => {
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          if (result.success === 200) {
            toast.success(
              "Successfully sent an email to the Restaurant business email.",
              {
                position: "top-center",
              }
            );
          }
          setModalVisibility(false);
        },
        (error) => {
          toast.error(error.text, {
            position: "top-center",
          });
        }
      );
  };
  //  What to render
  let content = "";
  if (isLoading) {
    content = <h6>Loading...</h6>;
  } else if (!isLoading && error) {
    content = <h6>Error Occured!</h6>;
  } else if (!isLoading && !error) {
    content = (
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Index</th>
            <th>Information</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {restaurants
            .filter((restaurant) => !restaurant.status)
            .map(
              (
                {
                  _id,
                  name,
                  res_name,
                  res_email,
                  res_address,
                  lattitude,
                  longitude,
                  res_contact,
                },
                index
              ) => {
                return (
                  <tr key={_id}>
                    <td>{index + 1}</td>
                    <td>
                      <h6>
                        <b>Owner:</b> {name}
                      </h6>
                      <h6>
                        <b>Restaurant:</b> {res_name}
                      </h6>
                      <h6>
                        <b>Email:</b> {res_email}
                      </h6>
                      <h6>
                        <b>Address:</b> {res_address}
                      </h6>
                      <h6>
                        <b>Phone:</b> {res_contact}
                      </h6>
                    </td>
                    <td>11/1/2023</td>
                    <td onClick={() => acceptHandler(name, res_email)}>
                      <PrimaryButton text="Accept" />
                    </td>
                  </tr>
                );
              }
            )}
        </tbody>
      </table>
    );
  }
  return (
    <div>
      <div>{content}</div>
      {modalVisible && (
        <div className="w-1/3 mx-auto bg-gray-900 p-3 rounded-lg text-white">
          <div className="">
            <h3 className="font-bold text-lg">
              Are you sure you want to accept this restaurant for bussiness?
            </h3>
            <p className="py-4">
              An Email will sent to the restaurant email shortly to congratulate
              them for acceptance to bussiness with us.
            </p>
            <div className="text-right" onClick={finalcceptHandler}>
              <LoadingButton loading={loading} text="Sure">
                Sure!
              </LoadingButton>
            </div>
            <form ref={form} className="hidden">
              <input type="text" defaultValue={name} name="name" />
              <input type="text" defaultValue={email} name="email" />
              <textarea type="text" defaultValue={message} name="message" />
            </form>
          </div>
        </div>
      )}
      <ToastContainer toastClassName="dark-toast" />
    </div>
  );
}
