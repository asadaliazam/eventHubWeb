import React, { Component } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Login.css";
import { Auth } from "aws-amplify";
import {reactLocalStorage} from 'reactjs-localstorage';
import axios from 'axios';
import loginImage from '../images/login.jpg';



export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
        isLoading: false,
        email: "",
        password: ""
      };
    }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      reactLocalStorage.set('email', this.state.email);
      let data = {
        email:this.state.email,
      }
      axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/checkLogin`, { data })
      .then(res => {
        reactLocalStorage.set('firstLogin', res.data[0].firstLogin);
      })
    .catch((error) => {
      console.log(error);
    });
    this.props.userHasAuthenticated(true);
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  render() {
    return (
      <div className="sub-body">
        <div className="Login">

        <div className="LoginBackground">
        <div className="gradient-login"></div>

        <div className="Loginimage">
        
        <img src={loginImage} alt="login"/>

        </div>


          <div className="LoginContent">

          <h3>Sign In</h3>
          <form onSubmit={this.handleSubmit}>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                autoFocus
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                value={this.state.password}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <FormGroup controlId="forgot" bsSize="large">
              <ControlLabel><a href="/notfound">Forgot Password?</a></ControlLabel>
            </FormGroup>
            <LoaderButton
              className="buttonload"
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Login"
              loadingText="Logging"
            />
            <FormGroup className="new-log" controlId="new-log" bsSize="large">
              <ControlLabel>New to EventHub?</ControlLabel>
              

              <LinkContainer  to="/signup">

              <a>Sign Up</a>
              </LinkContainer>
              
              
              
                
            </FormGroup>

          </form>
          </div>
          </div>
        </div>
      </div>
    );
  }
}
