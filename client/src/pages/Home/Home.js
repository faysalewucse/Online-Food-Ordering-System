import Articles from "./Articles";
import Banner from "./Banner";
import ClientsComments from "./ClientsComments";
import Dishes from "./Dishes";
import OrderProcedure from "./OrderProcedure";
import OurApp from "./OurApp";
import ConvenceRestaurants from "./ConvenceRestaurants";
import PopularRestaurant from "./PopularRestaurant";
import Subscribe from "./Subscribe";

export default function Home() {
  return (
    <div>
      <Banner />
      <Dishes />
      <OrderProcedure />
      <PopularRestaurant />
      <ConvenceRestaurants />
      <OurApp />
      <ClientsComments />
      <Articles />
      <Subscribe />
    </div>
  );
}
