import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import "./DiscoverNow.css";
import meetup from '../images/meetup.jpg';
import eventbrite from '../images/eventbrite.jpg';



class DiscoverNow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event_list : [],
      meetup_events : [],
      eventBrite_events: [],
    }
  }

  componentDidMount() {
    let data = {
      dateString : moment(new Date()).format("YYYY-MM-DD hh:mm:ss")
    }
  axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/getDiscoverNow`, { data })
      .then(res => {
        this.setState({event_list : res.data})
        console.log(res.data);
      })
    .catch((error) => {
      console.log(error);
    });

    axios.get(`https://cors-anywhere.herokuapp.com/https://api.meetup.com/find/upcoming_events?photo-host=secure&page=10&end_time_range=20%3A00%3A00&sig_id=263681792&radius=20&start_time_range=16%3A00%3A00&sig=022e48d732ed0fdde339029a65036a8cc80a7c1b
    `)
      .then(res => {
        console.log(res.data.events);
        this.setState({meetup_events : res.data.events})

      })
    .catch((error) => {
      console.log(error);
    });

    axios.get(`https://cors-anywhere.herokuapp.com/https://www.eventbriteapi.com/v3/events/search/?q=music&sort_by=best&location.latitude=49.246292&location.longitude=-123.116226&price=free&token=P6J4XRUIK64T2MOIL3MX
    `)
      .then(res => {
        console.log(res.data.events);
        this.setState({eventBrite_events : res.data.events})

      })
    .catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <div className="body">
        <div className="content">
          <h3>Our Events</h3>
          {this.state.event_list.map(event =>
            <a key={event.eventId} href={`eventDetails/${event.eventId}`}>
              <div className="Events">
                <div className="event-image">
                  <img src={`${event.eventPicture}`} alt="event" />
                </div>
                <div className="event-description">
                  <p>{moment.utc(event.eventStartTime).format('MMMM DD, YYYY, hh:mm a')}</p>
                  <p>{event.eventAddress} {event.eventLocation}</p>
                    <h5>{event.eventTitle}</h5>
                    <p>Tickets Left: {event.remainingTickets}</p>
                    
                  </div>
              </div>
            </a>
          )}
                      <h3>Events from Meetup</h3>

          {this.state.meetup_events.slice(0, 6).map(event =>
            <a key={event.id} href={event.link} target="_blank" rel="noopener noreferrer">
            <div className="Events">
                <div className="event-image">
                  <img src={meetup} alt="event" />
                </div>
                <p>{event.name}</p>
                {/* <p>{event.venue.address_1}</p>
                <p>{event.venue.city}, {event.venue.state}, {event.venue.localized_country_name}</p> */}
              </div>
            
          </a>
            
           
          )}
                                        <h3>Events from EventBrite</h3>

                    {this.state.eventBrite_events.slice(0, 6).map(event =>
            <a key={event.id} href={event.url} target="_blank" rel="noopener noreferrer">
            <div className="Events">
                <div className="event-image">
                  <img src={eventbrite} alt="event" />
                </div>
                <p>{event.name.text}</p>
              </div>
            
          </a>
            
           
          )}
        </div>
      </div>
    )
  }
}

export default DiscoverNow;
