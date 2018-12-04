import React, { Component } from "react";
import "./Footer.css";
import footerTopImage from "../images/footer1.png";

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <div className="FooterTop">
          <div className="FooterTopImg" />
          <div className="FooterTopImgPic">
            <img src={footerTopImage} alt="footer" />
            <div className="FooterBottom">
              <a className="item1" eventkey={1} href="/about">
                About Us
              </a>
              <a className="item2" eventkey={2} href="/contact">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Footer;
