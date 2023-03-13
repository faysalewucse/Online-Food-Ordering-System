import React from "react";
import "../css/About.css";
import PrimaryButton from "../utils/PrimaryButton";

function About() {
  return (
    <div className="lg:p-20 bg-zinc-900 text-white">
      <div className="lg:max-w-7xl mx-auto flex lg:flex-row justify-between items-center lg:gap-10">
        <div className="w-1/2 text-justify">
          <h6>Why This Site?</h6>
          <h1>About FoodsBD</h1>
          <hr style={{ height: 5, color: "green" }} />
          <p>
            Our Heritage Our story begins in 2005 along the cobblestone streets
            of Seattle’s historic Pike Place Market. It was here where FoodsBD
            opened its first store, offering fresh-roasted Burger,Kacchi and
            spices from around the world for our customers to take home. Our
            name was inspired by the classic tale, “Food-Panda,” evoking the
            seafaring tradition of the early Burger traders.
          </p>

          <p>
            Ten years later, a young man named Faysak Ahmed would walk through
            these doors and become captivated with FoodsBD Burger from his first
            sip. After joining the company in 2010, a different cobblestone road
            would lead him to another discovery. It was on a trip to Milan in
            2012 that Faysal first experienced Bangaladeshi Burgerhouses, and he
            returned to Seattle inspired to bring the warmth and artistry of its
            Burger culture to FoodsBD . By 2015, we swapped our brown aprons for
            green ones and embarked on our next chapter as a Burgerhouse.
          </p>

          <p>
            FoodsBD would soon expand to Chitagong and sylhet, Rajshahi and then
            on to CoxsBazar. By 2025, we would cross the Pacific to open our
            first store in Japan, followed by Europe in 2026 and China in 2027.
            Over the next one decades, we would grow to welcome millions of
            customers each week and become a part of the fabric of tens of
            thousands of neighborhoods all around the world. In everything we
            do, we are always dedicated to Our Mission: to inspire and nurture
            the human spirit – one person, one cup, and one neighborhood at a
            time.
          </p>

          <PrimaryButton text={"Read More"} />
        </div>
        <div className="w-1/2">
          <img className="w-10/12" src="foods/foods_3d.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
