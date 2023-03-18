import React from "react";
import "../css/Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-4">
            <a className="navbar-brand" href="/">
              Foods
              <span style={{ color: "#38ac33", fontWeight: "700" }}>Hub</span>
            </a>
            <p className="mt-2">
              Special Cooking and delivery technologies allow you to buy fresh
              and healthy food.
            </p>
          </div>
          <div className="col">
            <h4>
              <b>Quick Link</b>
            </h4>
            <ul>
              <li>
                <a href="/">About Us</a>
              </li>
              <li>
                <a href="/res-login">Restaurant Login</a>
              </li>
              <li>
                <a href="/">Become a partner</a>
              </li>
              <li>
                <a href="/">Our Team</a>
              </li>
              <li>
                <a href="/">Blog</a>
              </li>
              <li>
                <a href="/">Contact</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h4>
              <b>Useful Link</b>
            </h4>
            <ul>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Terms and Condition</a>
              </li>
              <li>
                <a href="/">Disclaimer</a>
              </li>
              <li>
                <a href="/">Support</a>
              </li>
              <li>
                <a href="/">FAQ</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h4>
              <b>Get to Know Us</b>
            </h4>
            <ul>
              <li>
                <a href="/">Git Cards</a>
              </li>
              <li>
                <a href="/">Doosdash Stories</a>
              </li>
              <li>
                <a href="/">Linkedin</a>
              </li>
              <li>
                <a href="/">Glassdoor</a>
              </li>
              <li>
                <a href="/">Accessibility</a>
              </li>
            </ul>
          </div>
          <div className="col">
            <h4>
              <b>Contact</b>
            </h4>
            <ul>
              <li>
                <a href="/">Whats App</a>
              </li>
              <li>
                <a href="/">Support 24</a>
              </li>
            </ul>
          </div>
        </div>
        <hr className="border border-white w-full" />
        <div className="w-100 flex justify-between items-start">
          <p>
            Copyright ©{" "}
            <a href="https://mdfaysalahmad.netlify.app">Faysal Ahmad</a> 2022
            All rights reserved
          </p>
          <div className="flex gap-2 social-media">
            <a href="/">
              <i className="fs-6 fa-brands fa-facebook-f"></i>
            </a>
            <a href="/">
              <i className="fs-6 fa-brands fa-linkedin-in"></i>
            </a>
            <a href="/">
              <i className="fs-6 fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
