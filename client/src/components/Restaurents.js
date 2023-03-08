import React from "react";
import RestaurentCard from "../cards/RestaurentCard";
import "../css/Restaurents.css";
import ReactSearchBox from "react-search-box";
import Levenshtein from "levenshtein";
import { useGetRestaurantsQuery } from "../features/restaurant/restaurantApi";
import { useDispatch } from "react-redux";
import { setRestaurants } from "../features/restaurant/restaurantSlice";

export default function Restaurents(props) {
  const dispatch = useDispatch();
  let { data: restaurants, isLoading } = useGetRestaurantsQuery();

  let data = [{}];
  for (let index in restaurants) {
    data.push({
      key: restaurants[index].res_name.toLowerCase().replace(/\s+/g, ""),
      value: restaurants[index].res_name,
    });
  }

  if (!isLoading) {
    restaurants = restaurants.map((res, index) => {
      return (
        <RestaurentCard
          {...res}
          key={index}
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
    var copyArray = restaurants;
    dispatch(setRestaurants([...copyArray].sort(compare)));
  };

  const filterData = [
    {
      name: "Sort",
      categories: [
        "Recomended (Default)",
        "Top Rated",
        "Fastest Delivery",
        "Distance",
      ],
    },
    {
      name: "Offers",
      categories: ["Free Delivery", "Offer", "Online Payment Available"],
    },
  ];

  return (
    <div className="restaurants">
      <div className="p-4 container">
        <div className="row mb-5">
          <div className="col-2 res-list-filter">
            <h4>Filter</h4>
            <hr />
            {filterData.map((data, index) => (
              <div key={index} className="mt-5">
                <h5>{data.name}</h5>
                {data.categories.map((category, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <input
                      className="me-2"
                      type="radio"
                      name={category.toLowerCase()}
                      id={category.toLowerCase()}
                    />
                    <label htmlFor={category.toLowerCase()}>{category}</label>
                  </div>
                ))}
              </div>
            ))}
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
                <div className="row">{restaurants}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
