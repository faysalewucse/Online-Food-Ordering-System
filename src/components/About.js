import React from "react";
import "../css/About.css";

function About() {
  return (
    <div className="container about--container">
      <div className="container-fluid row p-5 align-items-center">
        <div className="col-md-8">
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

          <h6>
            Ten years later, a young man named Faysak Ahmed would walk through
            these doors and become captivated with FoodsBD Burger from his first
            sip. After joining the company in 2010, a different cobblestone road
            would lead him to another discovery. It was on a trip to Milan in
            2012 that Faysal first experienced Bangaladeshi Burgerhouses, and he
            returned to Seattle inspired to bring the warmth and artistry of its
            Burger culture to FoodsBD . By 2015, we swapped our brown aprons for
            green ones and embarked on our next chapter as a Burgerhouse.
          </h6>

          <p>
            FoodsBD would soon expand to Chitagong and sylhet, Rajshahi and then
            on to CoxsBazar. By 2018, we would cross the Pacific to open our
            first store in Japan, followed by Europe in 2021 and China in 2022.
            Over the next one decades, we would grow to welcome millions of
            customers each week and become a part of the fabric of tens of
            thousands of neighborhoods all around the world. In everything we
            do, we are always dedicated to Our Mission: to inspire and nurture
            the human spirit – one person, one cup, and one neighborhood at a
            time.
          </p>

          <h4 className="read--more">Read More</h4>
        </div>
        <div className="col-md-4">
          <img className="img-fluid" src="images/about_page.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default About;
