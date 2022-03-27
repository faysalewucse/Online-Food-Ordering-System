import React, { useState, useEffect } from "react";
import RestaurentCard from "../cards/RestaurentCard";
import "../css/RestaurentList.css";
import restaurentsData from "../database/RestaurentList";
import ReactSearchBox from "react-search-box";
import { getAllRes } from "../api/resdata";

function RestaurentList(props) {
  useEffect(() => {
    getAllRes(props.setAllRestaurent);
  }, []);

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

  let restaurents;
  if (props.allrestaurent) {
    restaurents = props.allrestaurent.map((res) => {
      return (
        <RestaurentCard
          {...res}
          setResEmail={props.setResEmail}
          setRestaurentPath={props.setRestaurentPath}
          className="col res--card"
        />
      );
    });
  }

  return (
    <div className="p-4 container">
      <div className="row mb-5">
        <div className="col-2 res--list--category">
          <h2 className="mb-5" style={{ color: "white", textAlign: "center" }}>
            Categories
          </h2>
          <h3>Ethnic</h3>
          <h3>Fast Food</h3>
          <h3>Fast Casual</h3>
          <h3>Food Card</h3>
          <h3>Fast Casual</h3>
          <h3>Fast Casual</h3>
          <h3>Casual Dining</h3>
          <h3>Hotel</h3>
          <h3>Premium Casual</h3>
          <h3>Restaurent</h3>
          <h3>Family Style</h3>
          <h3>Fine Dining</h3>
          <h3>Cafe</h3>
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
              <div className="row">{restaurents}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurentList;
