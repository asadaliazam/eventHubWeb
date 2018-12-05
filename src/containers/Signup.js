import React, { Component } from "react";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./Signup.css";
import { Auth } from "aws-amplify";
import axios from 'axios';
import {reactLocalStorage} from 'reactjs-localstorage';
import loginImage from '../images/login.jpg';


export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.addToDatabase = this.addToDatabase.bind(this);


    this.state = {
      isLoading: false,
      email: "",
      password: "",
      name:"",
      confirmPassword: "",
      confirmationCode: "",
      newUser: null
    };
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  addToDatabase() {

    let userData = {
      name : this.state.name,
      email : this.state.email
    }
axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/addUser`, { userData })
      .then(res => {
        console.log(res.data);
      })
    .catch((error) => {
      console.log(error);
    });
    reactLocalStorage.set('email', userData.email);
    let data = {
      email:userData.email,
    }
    axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/checkLogin`, { data })
      .then(res => {
        reactLocalStorage.set('firstLogin', res.data[0].firstLogin);
        this.props.userHasAuthenticated(true);
        this.props.history.push("/personalitySurvey");
      })
    .catch((error) => {
      console.log(error);
    });
  }

  validateConfirmationForm() {
    return this.state.confirmationCode.length > 0;
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
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
    } catch (e) {
      alert(e.message);
    }

    this.setState({ isLoading: false });
  }

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);


      this.addToDatabase();

    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  }

  renderConfirmationForm() {
    return (
      <div className="sub-body">
        <div className="Confirmation">
          <h3>Confirmation</h3>
          <form onSubmit={this.handleConfirmationSubmit}>
            <FormGroup controlId="confirmationCode" bsSize="large">
              <ControlLabel>Confirmation Code</ControlLabel>
              <FormControl
                autoFocus
                type="tel"
                value={this.state.confirmationCode}
                onChange={this.handleChange}
              />
              <HelpBlock>Please check your email for the code.</HelpBlock>
            </FormGroup>
            <LoaderButton
              block
              bsSize="large"
              disabled={!this.validateConfirmationForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Verify"
              loadingText="Verifying…"
            />
          </form>
        </div>
      </div>
    );
  }

  renderForm() {
    return (
      <div className="sub-body-signup">
        <div className="SignUpPage">

        <div className="LoginBackground">
        <div className="gradient-login"></div>

        <div className="Loginimage">
        
        <img src={loginImage} alt="login"/>

        </div>


          <div className="LoginContent">

          <h3>Sign Up</h3>
          <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="name" bsSize="large">
              <ControlLabel>Name</ControlLabel>
              <FormControl
                autoFocus
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
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
            <FormGroup controlId="confirmPassword" bsSize="large">
              <ControlLabel>Confirm Password</ControlLabel>
              <FormControl
                value={this.state.confirmPassword}
                onChange={this.handleChange}
                type="password"
              />
            </FormGroup>
            <LoaderButton
              block
              bsSize="large"
              disabled={!this.validateForm()}
              type="submit"
              isLoading={this.state.isLoading}
              text="Sign up"
              loadingText="Signing up…"
            />
          </form>
          </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="Signup">
        {this.state.newUser === null
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    );
  }
}
