import React from "react";
import "../../css/PopularRestaurant.css";

export default function PopularRestaurant() {
  const popular_restaurants = [
    {
      name: "Haji Totel and Restaurant",
      start: 4.4,
      sell: 102,
      location: "Demra, Dhaka",
      delivery_time: 15,
    },
    {
      name: "Haji Totel and Restaurant",
      start: 4.4,
      sell: 102,
      location: "Demra, Dhaka",
      delivery_time: 15,
    },
    {
      name: "Haji Totel and Restaurant",
      start: 4.4,
      sell: 102,
      location: "Demra, Dhaka",
      delivery_time: 15,
    },
    {
      name: "Haji Totel and Restaurant",
      start: 4.4,
      sell: 102,
      location: "Demra, Dhaka",
      delivery_time: 15,
    },
    {
      name: "Haji Totel and Restaurant",
      start: 4.4,
      sell: 102,
      location: "Demra, Dhaka",
      delivery_time: 15,
    },
  ];
  return (
    <div className="p-5 popular-restaurant">
      <div className="container text-center text-dark">
        <h1 className="fw-bold start-text">
          Popular Restaurant with Delicious Food
        </h1>
        <p className="fs-4 mb-5">
          Welcome to the Big Online Food Delivery System.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 ">
          {popular_restaurants.map((restaurant, index) => (
            <div key={index} className="res-card">
              <div>
                <img
                  src="images/restaurant/res_1.jpg"
                  className="res-img"
                  alt="res_1"
                />
                <div className="card-title flex flex-col mb-2">
                  <h5 className="pt-3 fw-bold">{restaurant.name}</h5>
                  <div>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star text-warning"></i>
                    <i className="fa-solid fa-star-half-stroke text-warning"></i>
                    <i className="fa-regular fa-star text-warning"></i>{" "}
                  </div>
                  <span>
                    {restaurant.rating}({restaurant.sell}+)
                  </span>
                  <h5 className="mt-1">{restaurant.location}</h5>
                  <div className="w-full flex justify-center gap-5 items-center">
                    <div className="flex gap-2 items-center">
                      <span>
                        <i class="fa-solid fa-truck"></i>
                      </span>
                      <h5 className="mb-0">{restaurant.delivery_time} min.</h5>
                    </div>
                    <h5 className="enter-res-btn">Enter </h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h5 className="mt-5 all-res-btn text-center">See All Restaurants...</h5>
    </div>
  );
}
