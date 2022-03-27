import React, { useEffect, useState } from "react";
import foodData from "../database/FoodData";
import FoodCard from "../cards/FoodCard";
import ReactSearchBox from "react-search-box";
import { getResFood } from "../api/resdata";

function ShopPage(props) {
  const data = [
    {
      key: "john",
      value: "John Doe",
    },
    {
      key: "jane",
      value: "Jane Doe",
    },
    {
      key: "mary",
      value: "Mary Phillips",
    },
    {
      key: "robert",
      value: "Robert",
    },
    {
      key: "karius",
      value: "Karius",
    },
  ];

  let foods;
  if (props.allrestaurent) {
    props.allrestaurent.map((res) => {
      if (res.res_email === props.res_email) {
        foods = res.items.map((item) => {
          return (
            <FoodCard
              {...item}
              setCartCount={props.setCartCount}
              user={props.user}
              setUser={props.setUser}
              setAllRestaurent={props.setAllRestaurent}
              res_email={props.res_email}
              className="col res--card"
            />
          );
        });
      }
    });
  }
  // if (resFood.items) {
  //   foods = resFood.items.map((data) => {
  //     return (
  //       <FoodCard {...data} setIdandPath={props} className="col res--card" />
  //     );
  //   });
  // }

  // console.log(resFood.items);
  return (
    <div className="p-4 container">
      <div className="row mb-5">
        <div className="col-2 res--list--category">
          <h2 className="mb-5" style={{ color: "white", textAlign: "center" }}>
            Categories
          </h2>
          <h3>Rice</h3>
          <h3>Burger</h3>
          <h3>Pizza</h3>
          <h3>Set Menu</h3>
          <h3>Vegetables</h3>
          <h3>Drinks</h3>
          <h3>Snacks</h3>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <ReactSearchBox
                className="react-search-box"
                placeholder="Search Restaurent"
                value="Doe"
                data={data}
                callback={(record) => console.log(record)}
                inputBackgroundColor="#128db3"
                inputFontColor="white"
                inputFontSize="20px"
              />
            </div>
            <div className="box col">
              <select>
                <option>Delivery Charge</option>
                <option>Name</option>
                <option>Rating</option>
                <option>Popularity</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="row">{foods}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopPage;
