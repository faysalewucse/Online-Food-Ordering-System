import { useParams } from "react-router-dom";
import { useGetRestaurantQuery } from "../features/restaurant/restaurantApi";
import FoodCard from "../cards/FoodCard";
import ReactSearchBox from "react-search-box";
import Select from "react-select";
import Levenshtein from "levenshtein";
import { useEffect, useState } from "react";

// const Alert = React.forwardRef(function Alert(props, ref) {
//   return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

function ShopPage(props) {
  const [items, setItems] = useState(undefined);
  const { resId: restaurant_id } = useParams();
  const {
    data: restaurantData,
    isLoading,
    isError,
  } = useGetRestaurantQuery(restaurant_id);

  useEffect(() => {
    if (restaurantData) {
      setItems(restaurantData.items);
    }
  }, [restaurantData]);

  // const [open, setOpen] = React.useState(false);
  // const vertical = "bottom",
  //   horizontal = "right";

  // const [reviewsModalShow, setReviewsModalShow] = useState(false);
  // const [itemInReviewModel, setItem] = useState();

  // const handleClose = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpen(false);
  // };

  let content;
  if (isLoading && !isError) {
    content = <div>Loading...</div>;
  } else if (items) {
    content = items.map((item, index) => {
      return <FoodCard key={index} restaurant={restaurantData} item={item} />;
    });
  }

  let searchData = [{}];
  for (let index in items) {
    searchData.push({
      key: items[index].food_name.toLowerCase().replace(/\s+/g, ""),
      value: items[index].food_name,
    });
  }

  const lowh = () => {
    const newArray = [...items].sort((a, b) => {
      return a.food_price - b.food_price;
    });

    if (newArray) setItems(newArray);
  };

  const highl = () => {
    const newArray = [...items].sort((a, b) => {
      return b.food_price - a.food_price;
    });

    if (newArray) setItems(newArray);
  };

  const rating = () => {
    const newArray = [...items].sort((a, b) => {
      let x = 0,
        xl = [...a.rating].length;
      [...a.rating].forEach(({ star }) => (x += parseInt(star)));
      let y = 0,
        yl = [...b.rating].length;
      [...b.rating].forEach(({ star }) => (y += parseInt(star)));
      return Math.floor(y / yl) - Math.ceil(x / xl);
    });

    if (newArray) setItems(newArray);
  };

  const sell = () => {
    const newArray = [...items].sort((a, b) => {
      return b.sold - a.sold;
    });

    if (newArray) setItems(newArray);
  };

  const name = () => {
    const newArray = [...items].sort((a, b) => {
      let fa = a.food_name.toLowerCase(),
        fb = b.food_name.toLowerCase();
      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
    if (newArray) setItems(newArray);
  };

  const searchSort = (value) => {
    function compare(a, b) {
      var leva = new Levenshtein(a.food_name, searchkey).distance;
      var levb = new Levenshtein(b.food_name, searchkey).distance;
      return leva - levb;
    }

    var searchkey = value;
    var copyArray = items;
    setItems([...copyArray].sort(compare));
  };

  const aquaticCreatures = [
    { label: "Name", value: "name" },
    { label: "Price(Low > High)", value: "lowh" },
    { label: "Price (High > Low)", value: "highl" },
    { label: "Rating", value: "rating" },
    { label: "Sell", value: "sell" },
  ];

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto flex gap-5 mb-5">
        <div className="bg-black p-10 rounded-md text-white">
          <h2>Categories</h2>
          <h4>Rice</h4>
          <h4>Burger</h4>
          <h4>Pizza</h4>
          <h4>Set Menu</h4>
          <h4>Vegetables</h4>
          <h4>Drinks</h4>
          <h4>Snacks</h4>
        </div>
        <div className="col">
          <div className="row">
            <div className="col">
              <ReactSearchBox
                className="react-search-box"
                placeholder="Search Food"
                value="Doe"
                data={searchData}
                onSelect={(record) => searchSort(record.item.value)}
                inputBackgroundColor="white"
                inputFontColor="black"
                inputFontSize="20px"
              />
            </div>
            <div className="box col">
              <Select
                className="mb-3 sort-by-select"
                options={aquaticCreatures}
                placeholder="-Sort By-"
                onChange={(e) =>
                  e.value === "name"
                    ? name()
                    : e.value === "highl"
                    ? highl()
                    : e.value === "lowh"
                    ? lowh()
                    : e.value === "rating"
                    ? rating()
                    : sell()
                }
              />
            </div>
          </div>
          <div className="py-10 grid grid-cols-4 gap-4">{content}</div>
        </div>
      </div>
      {/* <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Added to Cart Successfully
        </Alert>
      </Snackbar>
      {itemInReviewModel ? (
        <FoodReviews
          show={reviewsModalShow}
          onHide={() => setReviewsModalShow(false)}
          item={itemInReviewModel}
        />
      ) : null} */}
    </div>
  );
}

// function FoodReviews(props) {
//   let reviews;
//   if (props.item.reviews) {
//     reviews = props.item.reviews.map((review) => {
//       return <div className="reviews-card">{review.review}</div>;
//     });
//   }

//   let foodTotal = 0;
//   let length = props.item.rating.length - 1;
//   props.item.rating.forEach(({ star }) => (foodTotal += parseInt(star)));
//   let avgStar = Math.floor(foodTotal / length);

//   return (
//     <Modal
//       {...props}
//       size="md"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       <div>
//         <div className="row food-reviews-modal-container">
//           <div className="col">
//             <img
//               className="img-fluid"
//               style={{ borderRadius: "10px" }}
//               src={props.item.img_path}
//               alt=""
//             />
//           </div>
//           <div className="col">
//             <h4>Name: {props.item.food_name}</h4>
//             <h6>Price: {props.item.food_price} BDT</h6>
//             <div>
//               <h6>
//                 Rating:{" "}
//                 {[...Array(5)].map((star, index) => {
//                   index += 1;
//                   return (
//                     <button
//                       type="button"
//                       key={index}
//                       className={
//                         index <= avgStar ? "star-button on" : "star-button off"
//                       }
//                     >
//                       <span className="fa fa-star" />
//                     </button>
//                   );
//                 })}
//               </h6>
//             </div>
//           </div>
//           <h4 style={{ marginTop: "20px" }}>Reviews</h4>
//           <hr />
//           {reviews}
//         </div>
//       </div>
//     </Modal>
//   );
// }
export default ShopPage;
