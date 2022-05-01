import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import "../css/RiderPage.css";

function RiderPage({ rider }) {
  return (
    <div className="rider-page">
      <div>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">{rider.name}</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav style={{ marginLeft: "auto" }}>
                <Nav.Link className="notify" eventKey={2} href="#memes">
                  <i className="fa badge fa-lg" value={2}>
                    <i
                      style={{ fontSize: "20px" }}
                      class="fa-solid fa-bell"
                    ></i>
                  </i>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </div>
  );
}

export default RiderPage;
