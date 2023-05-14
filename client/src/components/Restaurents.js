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
  const { data: restaurants, isLoading, isError } = useGetRestaurantsQuery();

  let data = [{}];
  for (let index in restaurants) {
    data.push({
      key: restaurants[index].res_name.toLowerCase().replace(/\s+/g, ""),
      value: restaurants[index].res_name,
    });
  }

  let contents;
  if (isLoading && !isError) {
    contents = <h3>Loading...</h3>;
  } else if (!isLoading && restaurants) {
    contents = restaurants.map((res, index) => {
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
    <div>
      <div className="max-w-7xl mx-auto my-20">
        <div className="flex gap-5">
          <div className="">
            <h4>Filter</h4>
            <hr />
            {filterData.map((data, index) => (
              <div key={index} className="mt-5">
                <h5>{data.name}</h5>
                {data.categories.map((category, index) => (
                  <div key={index} className="d-flex align-items-center">
                    <input
                      className="mr-2"
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
          <div className="">
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
            <div className="my-10 grid grid-cols-4 gap-4">{contents}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
