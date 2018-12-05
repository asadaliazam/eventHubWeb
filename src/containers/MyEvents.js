import React, { Component } from 'react'
import {Tabs, Tab} from 'react-bootstrap';
import axios from 'axios';
import './MyEvents.css'
import {reactLocalStorage} from 'reactjs-localstorage';
import moment from 'moment';

class MyEvents extends Component {

  constructor(props) {
    super(props);
    this.state = {
      registeredEvents : [],
      createdEvents: [],
      visitedEvents: []

    };
  }

  componentDidMount() {

    let data = {
      email : reactLocalStorage.get('email'),
      date : moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    }
axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/getRegisteredEvents`, { data })
      .then(res => {
        console.log(res.data);
        this.setState({registeredEvents:res.data});
      })
    .catch((error) => {
      console.log(error);
    });



  let data2 = {
    email : reactLocalStorage.get('email'),
    date : moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
  }
axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/getVisitedEvents`, { data2 })
    .then(res => {
      console.log(res.data);
      this.setState({visitedEvents:res.data});
    })
  .catch((error) => {
    console.log(error);
  });

  let data3 = {
    email : reactLocalStorage.get('email'),
  }
axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/getCreatedEvents`, { data3 })
    .then(res => {
      console.log(res.data);
      this.setState({createdEvents:res.data});
    })
  .catch((error) => {
    console.log(error);
  });

}


  render() {
    return (
      <div className="MyEvents">
        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
          <Tab eventKey={1} title="Registered Events">
            <div className="body">
              <div className="content">
                <h3> Registered Events</h3>
                {this.state.registeredEvents.map(event =>
                  <a key={event.eventId} href={`eventDetails/${event.eventId}`}>
                    <div className="Events">
                      <div className="event-image">
                        <img src={`${event.eventPicture}`} alt="event" />
                      </div>
                      <div className="event-description">
                        <h5>{event.eventTitle}</h5>
                        <p>{moment.utc(event.eventStartTime).format('MMMM DD, YYYY, hh:mm a')}</p>
                        <p>{event.eventAddress}, {event.eventLocation}</p>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </Tab>
          <Tab eventKey={2} title="Created Events">
            <div className="body">
              <div className="content">
                <h3> Created Events</h3>
                {this.state.createdEvents.map(event =>
                  <a key={event.eventId} href={`eventDetailsCreated/${event.eventId}`}>
                    <div className="Events">
                      <div className="event-image">
                        <img src={`${event.eventPicture}`} alt="event" />
                      </div>
                      <div className="event-description">
                        <h5>{event.eventTitle}</h5>
                        <p>{moment.utc(event.eventStartTime).format('MMMM DD, YYYY, hh:mm a')}</p>
                        <p>{event.eventAddress}, {event.eventLocation}</p>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </Tab>
          <Tab eventKey={3} title="Visited Events">
            <div className="body">
              <div className="content">
                <h3> Visited Events</h3>
                {this.state.visitedEvents.map(event =>
                  <a key={event.eventId} href={`eventDetails/${event.eventId}`}>
                    <div className="Events">
                      <div className="event-image">
                        <img src={`${event.eventPicture}`} alt="event" />
                      </div>
                      <div className="event-description">
                        <h5>{event.eventTitle}</h5>
                        <p>{moment.utc(event.eventStartTime).format('MMMM DD, YYYY, hh:mm a')}</p>
                        <p>{event.eventAddress}, {event.eventLocation}</p>
                      </div>
                    </div>
                  </a>
                )}
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

export default MyEvents;
