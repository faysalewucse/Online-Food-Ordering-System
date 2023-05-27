import PrimaryButton from "../../components/PrimaryButton";

export default function OurApp() {
  return (
    <div className="p-10 md:p-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex md:flex-row flex-col-reverse items-center">
          <div className="text-center md:text-left">
            <h1>
              <b>Make the delicious food and Download our app</b>
            </h1>
            <p>
              Our company is engaged in the delivery of healthy and tasty food
              arround the city, Special cooking and delivery technologies allow
              you to buy fresh and healthy food and you can download our app to
              order food more easily.
            </p>
            <PrimaryButton text={"Download Now"} />
          </div>
          <img
            className="md:w-1/2 mt-5 md:mt-0"
            src="images/our-app.png"
            alt="mobile"
          />
        </div>
      </div>
    </div>
  );
}
