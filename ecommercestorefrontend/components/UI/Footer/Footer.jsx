import React from "react";
import { Container, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer ">
      <Container className="mb-0 ">
        <Row className=" pt-4 ">
          <Col xs={12} md={6} lg={3} className="mb-4">
            <div className="footer-logo">
              <div className="flex items-center ">
                <h5 className="m-0 text-[1.2vmax]">Ecommerce Store</h5>
              </div>
              <p className="text-[.9vmax] text-justify pt-[1vmax]">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.
              </p>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4">
            <div className="footer-column">
              <h5>Quick links</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text">
                    Shop{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="text">
                    Contact{" "}
                  </a>
                </li>
                <li>
                  <a href="#" className="text">
                    Privacy Policy                  </a>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 ">
            <div className="footer-column">
              <h5>Contact</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text">
                    92 (0) 000 0000000 <br />

                    ecommercestore123@gmail.com <br /> Karachi, Pakistan Tx 76051                  </a>
                </li>

              </ul>
            </div>
          </Col>
          <Col xs={12} md={6} lg={3} className="mb-4 ">
            <div className="footer-column">
              <h5>Get in touch</h5>
              <div className="social-icons text-[2vmax]">
              <FaFacebook  className="mr-3"/>
              <FaLinkedin className="mr-3" />
              <FaInstagram className="mr-3" />
              <FaTwitter className="mr-3" />

              </div>
              
            </div>
          </Col>
        </Row>
        <Row className="footer-bottom">
          <div className=" pt-1 flex">
            <p className="m-0 flex-1 text-center text-[.9vmax]">
              &copy; 2024 Dev Pulse Studio, All rights reserved
            </p>

          </div>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
