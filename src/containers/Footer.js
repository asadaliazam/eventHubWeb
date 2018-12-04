import React, { Component } from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import './Footer.css';
import footerTopImage from '../images/footer1.png';

class Footer extends Component {
  render() {
    return (
      <div className="Footer">
      

<div className="FooterTop">

<div className="FooterTopImg">

</div>

<div className="FooterTopImgPic">


<img src={footerTopImage}/>




<div className="FooterBottom">




    
<a className="item1" eventKey={1} href="/about">
           About Us
         </a>
         <a className="item2" eventKey={2} href="/contact">
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
