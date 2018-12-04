import React, { Component } from "react";
import "./Home.css";
import Search from './Search';
import moment from 'moment';
import axios from 'axios';
import ReactPlayer from 'react-player'
import image1 from '../images/event1.jpg';
import image2 from '../image2.jpg';
import image3 from '../image3.jpg';
import features from '../features.jpg';
import mockup from '../mock-ups.jpg';
// import image4 from '../image4.jpg';
import { Link } from "react-router-dom";
import DatePicker from 'react-date-picker';
import { Redirect } from 'react-router';
import {reactLocalStorage} from 'reactjs-localstorage';
import banner from '../images/banner1.jpg';
import aggregtor from '../images/aggregtor.png';
import personalization from '../images/personalization.png';
import checkin from '../images/checkin.png';
import mockup1 from '../images/mockup01.png';
import mockup2 from '../images/mockup2.png';
import mockup3 from '../images/mockup3.png';
import Calendar from './Calendar';



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.loadEvents = this.loadEvents.bind(this);

    this.state = {
      isLoading: true,
      event_list: [],
      date: new Date(),
    };
  }

  loadEvents() {

    let email = reactLocalStorage.get('email');
    console.log(12, reactLocalStorage.get('email'))
    console.log(12, email)

    let month = '' + (this.state.date.getMonth() + 1);
    let day = '' + this.state.date.getDate();
    let year = this.state.date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    let formattedDate = ([year, month, day].join('-'));
    

    let data = {
      date: formattedDate,
      email : email,
    }

    console.log(12, reactLocalStorage.get('email'))

    axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/displayEvents`, { data })
      .then(res => {
        console.log(res.data);
        this.setState({event_list: res.data});
      })
    .catch((error) => {
      console.log(error);
    });

    this.setState({ isLoading: false });
  }

  async componentDidMount() {
    if (this.props.isAuthenticated) {
      this.loadEvents();
    }
  }

  renderLandingPage() {

    return (
      <React.Fragment>
        <div className="banner">
          <div className = "bannerImage">
           <div className="imageContainer">         
             <img src={banner}/>
          </div>
        </div>
        <div className="bannerText">
          <div className = "textContainer">
           <h1>Event Hub</h1>
           <p> Never miss an event! </p>
          </div>
        </div>
        
        </div>

        <div className="body">
          <div className="intro">
          <h1> What We Do? </h1>
            <p><strong>EventHub</strong> is a multi-platform application that aggregates events from different websites and allows the user to see events happening around their area based on their personality.
            The application will help users find events across the city regardless of which website they are posted on. The user will be presented with only those events that are relevant to them.
            The application will also provide the user the ability to check-in to the events which will allow the event organizer to get an idea of the popularity of the event.</p>
          </div>
          
          <div className="content">
          <h1> Events To Explore </h1>
            <div className="Events">
              <div className="event-image">
                <img src={image1} alt="event1"/>
              </div>
              <div className="event-description">
                <p>January 16, 5:00pm</p>
                <p>Vancouver, BC</p>
                <h5>Micro-Organisms</h5>
                <p>Hosted by Brittney Jameson</p>
              </div>
            </div>
            <div className="Events">
              <div className="event-image">
                <img src={image2} alt="event2"/>
              </div>
              <div className="event-description">
                <p>January 24, 6:00pm</p>
                <p>Burnaby, BC</p>
                <h5>Metrotown Party</h5>
                <p>Hosted by Andy Smyth</p>
              </div>
            </div>
            <div className="Events">
              <div className="event-image">
                <img src={image3} alt="event3"/>
              </div>
              <div className="event-description">
                <p>February 8, 5:00pm</p>
                <p>Richmond, BC</p>
                <h5>YVR Cocktail</h5>
                <p>Hosted by YVR Airport</p>
              </div>
            </div>
          </div>

           <div className="Mockups">
           <h1> We are available on Android & iOS </h1>

            <div className="mockup">
            <img src={mockup1} alt="mockup"/>
            </div>

             <div className="mockup">
            <img src={mockup2} alt="mockup"/>
            </div>

             <div className="mockup">
            <img src={mockup3} alt="mockup"/>
            </div>

          </div>

          <div className="Features">
            <h1>Features</h1>
            <div className="feature">
           
            <img src={aggregtor} alt="features"/>
            <h2>Aggregator</h2>
            <p>There is no need to go to different event sites when EventHub provides you all the events you need under one roof!</p>
            </div>

             <div className="feature">
            <img src={checkin} alt="features"/>
            <h2>Check-In</h2>
            <p>Event Check-in is that much needed functionality that event organizers need to determine the popularity of their event and to see how many people attended.</p>
            </div>

             <div className="feature">
            <img src={personalization} alt="features"/>
            <h2>Personalization</h2>
            <p>EventHub provides you with personalized events so you don't have to look through heaps of events to find the right one</p>
            </div>
          </div>

         
          
          <div className="Video">
            <h1>About EventHub</h1>
            <div className="web-video">
              <ReactPlayer url='https://www.youtube.com/watch?v=HCBK9zpL3J0&feature=youtu.be' controls width="100%" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );

  }

  onChange = (date) => {
    this.setState({ date }, function () {
      this.loadEvents();
    });
  }

  renderPersonalizedEvents() {

    if ((reactLocalStorage.get('firstLogin')) === 'true') {
      return (
      <Redirect to={{
          pathname: '/personalitySurvey',
      }} />

      );

    }

    return (
      <React.Fragment>
        <div className="banner home-banner">
          <Link className="buttontype discover" to={`/discover`}>Discover Now</Link>
        </div>
        <div className="mid-nav">
          <Search/>
          <DatePicker
            onChange={this.onChange}
            value={this.state.date}
            clearIcon = {null}
            calendarIcon = {<Calendar />}
            
          />
        </div>
        <div className="body">
          <div className="content">
            <h3>Suggested Events</h3>
            {this.state.event_list.map(event =>
              <a key={event.eventId} href={`eventDetails/${event.eventId}`}>
                <div className="Events">
                  <div className="event-image">
                    <img src={`${event.eventPicture}`} alt="event" />
                  </div>
                  <div className="event-description">
                    <h5>{event.eventTitle}</h5>
                    <p>{moment(event.eventStartTime).format('MMMM DD, YYYY, hh:mm a')}</p>
                    <p>{event.eventAddress} {event.eventLocation}</p>
                  </div>
                </div>
              </a>
            )}
          </div>
          <div className="create-event">
            <p>Are you hosting an event?</p>
            <Link className="buttontype" to={`/createevent`}>Create Event</Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  render() {
    return (
      <div className="events">
        {this.props.isAuthenticated ? this.renderPersonalizedEvents() : this.renderLandingPage()}
      </div>
    );
  }
}
