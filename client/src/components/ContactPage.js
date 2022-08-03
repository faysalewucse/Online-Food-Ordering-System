import React, { useRef } from "react";
import "../css/ContactPage.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

function ContactPage() {
  const form = useRef();
  const navigate = useNavigate();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_3v0w01r",
        "template_7o3awvk",
        form.current,
        "YiqxE4MGs2K72WJZl"
      )
      .then(
        (result) => {
          localStorage.setItem("mailsent", "Mail Sent Successfully");
          navigate("/");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

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
            <form ref={form} onSubmit={sendEmail}>
              <div className="input-box">
                <input
                  required
                  type="text"
                  placeholder="Enter your name"
                  name="user_name"
                />
              </div>
              <div className="input-box">
                <input
                  required
                  type="text"
                  placeholder="Enter your email"
                  name="user_email"
                />
              </div>
              <div className="input-box message-box">
                <textarea
                  required
                  type="text"
                  placeholder="Write Your Message"
                  name="message"
                />
              </div>
              <div className="button">
                <input type="submit" defaultValue="Send Now" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
