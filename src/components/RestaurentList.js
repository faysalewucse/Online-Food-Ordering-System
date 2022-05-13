import React, { useState, useEffect } from "react";
import RestaurentCard from "../cards/RestaurentCard";
import "../css/RestaurentList.css";
import ReactSearchBox from "react-search-box";
import { getAllRes } from "../api/resdata";
import Levenshtein from "levenshtein";

function RestaurentList(props) {
  useEffect(() => {
    getAllRes(props.setAllRestaurent);
    setResArray(props.allrestaurent);
  }, []);

  let [resArray, setResArray] = useState();

  let data = [{}];
  for (let index in resArray) {
    data.push({
      key: resArray[index].res_name.toLowerCase().replace(/\s+/g, ""),
      value: resArray[index].res_name,
    });
  }

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

  const searchSort = (value) => {
    function compare(a, b) {
      var leva = new Levenshtein(a.res_name, searchkey).distance;
      var levb = new Levenshtein(b.res_name, searchkey).distance;
      return leva - levb;
    }

    var searchkey = value;
    var copyArray = resArray;
    props.setAllRestaurent([...copyArray].sort(compare));
  };

  console.log(data);
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
                placeholder="Search Restaurent..........."
                value="Doe"
                data={data}
                onSelect={(record) => searchSort(record.item.value)}
                inputBackgroundColor="#fffff"
                inputFontColor="black"
                inputFontSize="20px"
                inputHeight="50px"
              />
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
