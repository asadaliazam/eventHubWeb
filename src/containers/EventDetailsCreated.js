import React, { Component } from 'react';
import "./EventDetails.css";
import axios from 'axios';
import { Redirect } from 'react-router';
import Geocode from "react-geocode";
import GoogleMap from './GoogleMap';
import moment from 'moment';

Geocode.setApiKey(process.env.REACT_APP_GMAPS_KEY);

class EventDetailsCreated extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.match.params.id,
            event: [],
            redirect: false,
            eventLocationLatitude: '40.756795',
            eventLocationLongitude: '-73.954298',
            registeredUsers: 0,
            checkedInUsers: 0,
        };
    }

    registerEvent = (e) => {
        e.preventDefault();
        this.setState ({redirect : true});
    }

    componentDidMount() {

        axios.get(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/displayEvent/${this.state.eventId}`)
        .then(res => {
            // this.setState({trackTitle: '', events: res.data, redirect:true});
            this.setState({event:res.data}, function() {
                let address = this.state.event[0].eventAddress + " " + this.state.event[0].eventLocation;
                console.log(this.state.event);
                console.log(address);
                Geocode.fromAddress(address).then(
                    response => {
                      const { lat, lng } = response.results[0].geometry.location;
                      console.log(lat, lng);
                      this.setState({eventLocationLatitude: lat, eventLocationLongitude:lng});
                    },
                    error => {
                      console.error(error);
                    }
                  );

            });
        })
        .catch(err => console.log(err));
    

    axios.get(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/getRegisteredUsers/${this.state.eventId}`)
        .then(res => {
            this.setState({registeredUsers:res.data[0].count});
            console.log(res.data)
        })
        .catch(err => console.log(err));
    

    axios.get(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/getCheckedInUsers/${this.state.eventId}`)
    .then(res => {
        this.setState({checkedInUsers:res.data[0].count});
        console.log(res.data)
    })
    .catch(err => console.log(err));
}


  render() {
      const lat = this.state.eventLocationLatitude;
      const long = this.state.eventLocationLongitude;
      const location = {lat, long};
      const eventId = this.state.eventId;
      if (this.state.redirect === false) {

    return (
      <React.Fragment>
        <div className="sub-body-EventDetails">
          <div className="EventDetails">
            {this.state.event.map(event =>
                <div key={event.eventId}>
                  <div className="top-half">
                    <div className="event-image">
                      <img src ={`${event.eventPicture}`} alt="event" />
                    </div>
                    <div className="event-details">
                      <h5>{event.eventTitle}</h5>
                      <p>Starts on {moment.utc(event.eventStartTime).format('MMMM DD, YYYY, hh:mm a')}</p>
                      <p>{event.eventAddress}, {event.eventLocation}</p>
                      <p>{event.remainingTickets} Tickets Left</p>
                      <form onSubmit = {this.registerEvent.bind(this)}>
                          <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Register</button>
                      </form>
                    </div>
                  </div>
                  <div className="bottom-half">
                    <h6 className="eventDes">Event Description</h6>
                    <p className="eventDes">{event.eventDescription}</p>
                    <h6 className="eventDes">Event Topic</h6>
                    <p className="eventDes">{event.eventTopic}</p>
                    <h6 className="eventDes">Event Type</h6>
                    <p className="eventDes">{event.eventType}</p>

                    <h6 className="eventDes">Registered Users</h6>
                    <p className="eventDes">{this.state.registeredUsers} |  <a href={`/viewRegisteredDetails/${eventId}`}>View Details</a></p>

                    <h6 className="eventDes">CheckedIn Users</h6>
                    <p className="eventDes">{this.state.checkedInUsers} |  <a href={`/viewCheckedInDetails/${eventId}`}>View Details</a></p>

                   


                    <div className="google-location">
                      <GoogleMap location={location} />
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </React.Fragment>
    )
  }


    else if (this.state.redirect === true) {
        return <Redirect to={{
            pathname: '/register',
            state: { event: this.state.event }
        }}
      />
    }
  }
}

export default EventDetailsCreated;
