import React from "react";
import "../css/ContactPage.css";

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="container contact-page-container">
        <div className="content">
          <div className="left-side">
            <div className="address details">
              <i className="fas fa-map-marker-alt" />
              <div className="topic">Address</div>
              <div className="text-one">Aftabnagar, Rampura</div>
              <div className="text-two">Dhaka - 1361</div>
            </div>
            <div className="phone details">
              <i className="fas fa-phone-alt" />
              <div className="topic">Phone</div>
              <div className="text-one">+880 163449-5020</div>
              <div className="text-two">+880 132356-1257</div>
            </div>
            <div className="email details">
              <i className="fas fa-envelope" />
              <div className="topic">Email</div>
              <div className="text-one">foodsbdofficial@gmail.com</div>
              <div className="text-two">foodsbddev@gmail.com</div>
            </div>
          </div>
          <div className="right-side">
            <div className="topic-text">Send us a message</div>
            <p>
              If you have any work from me or any types of quries related to my
              tutorial, you can send me message from here. It's my pleasure to
              help you.
            </p>
            <form action="#">
              <div className="input-box">
                <input required type="text" placeholder="Enter your name" />
              </div>
              <div className="input-box">
                <input required type="text" placeholder="Enter your email" />
              </div>
              <div className="input-box message-box">
                <textarea
                  required
                  type="text"
                  placeholder="Write Your Message"
                />
              </div>
              <div className="button">
                <input type="button" defaultValue="Send Now" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
