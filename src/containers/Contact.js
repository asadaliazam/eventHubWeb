import React, { Component } from 'react';
import './Contact.css';
import { FormGroup, FormControl } from 'react-bootstrap';
import LoaderButton from "../components/LoaderButton";

class Contact extends Component {
  render() {
    return (
      <div className="sub-body-contact">
        <div className="Contact">
          <h3>Contact Us</h3>
          <form>
            <FormGroup>
             <FormControl type="text" placeholder="First Name" name="firstName"/>
            </FormGroup>
            <FormGroup>
              <FormControl type="text" placeholder="Last Name" name="lastName"/>
            </FormGroup>
            <FormGroup>
              <FormControl type="text" placeholder="Email" name="email"/>
            </FormGroup>
            <FormGroup>
              <FormControl componentClass="textarea" placeholder="Comments" name="comments"/>
            </FormGroup>
            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Submit"
              loadingText="Comments Submitted"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default Contact;
