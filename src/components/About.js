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
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
            ducimus sequi praesentium, quos ad deleniti aspernatur, aliquid
            provident dolorem nostrum harum non. Ipsam itaque repellendus
            doloremque magni tempora mollitia corporis deserunt ratione?
            Distinctio quos quod repellat voluptate consequatur delectus nemo
            exercitationem! Velit voluptatibus, animi tempora magni repellendus
            expedita vitae natus, rem obcaecati placeat et accusantium culpa eos
            earum est beatae nihil odio quasi ducimus minus. Molestias quasi
            earum soluta optio exercitationem. Consequatur ullam aperiam
            laboriosam voluptatum! Tempora beatae, quia nesciunt ratione vero
            eum? Facere cum nostrum culpa et voluptatibus pariatur, in
            consequuntur ullam iste natus eligendi, nam cumque numquam
            repellendus!
          </p>

          <h6>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
            provident eveniet ipsum cupiditate a blanditiis repellat nemo
            voluptas aspernatur iusto, pariatur perferendis accusantium, quo
            incidunt at officia non dignissimos quia. Error doloribus eius ab
            officiis, tenetur iure pariatur delectus vel amet nihil facere
            recusandae! Porro sunt explicabo accusamus maxime repellendus.
          </h6>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut
            ducimus sequi praesentium, quos ad deleniti aspernatur, aliquid
            provident dolorem nostrum harum non. Ipsam itaque repellendus
            doloremque magni tempora mollitia corporis deserunt ratione?
            Distinctio quos quod repellat voluptate consequatur delectus nemo
            exercitationem! Velit voluptatibus, animi tempora magni repellendus
            expedita vitae natus, rem obcaecati placeat et accusantium culpa eos
            earum est beatae nihil odio quasi ducimus minus. Molestias quasi
            earum soluta optio exercitationem. Consequatur ullam aperiam
            laboriosam voluptatum! Tempora beatae, quia nesciunt ratione vero
            eum? Facere cum nostrum culpa et voluptatibus pariatur, in
            consequuntur ullam iste natus eligendi, nam cumque numquam
            repellendus!
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
