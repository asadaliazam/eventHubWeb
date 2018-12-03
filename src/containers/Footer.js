import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import './Footer.css';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
        <Nav justified>
         <NavItem className="item1" eventKey={1} href="/about">
           About Us
         </NavItem>
         <NavItem className="item2" eventKey={2} href="/contact">
           Contact Us
         </NavItem>
       </Nav>
      </div>
    );
  }
}

export default Footer;
