import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import "./DiscoverNow.css"

class DiscoverNow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      event_list : [],
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
  }

  render() {
    return (
      <div className="body">
        <div className="content">
          <h3>Discover Now</h3>
          {this.state.event_list.map(event =>
            <a key={event.eventId} href={`eventDetails/${event.eventId}`}>
              <div className="Events">
                <div className="event-image">
                  <img src={`${event.eventPicture}`} alt="event" />
                </div>
                <div className="event-description">
                  <h5>{event.eventTitle}</h5>
                  <p>{moment(event.eventStartTime).format('MMMM DD, YYYY, hh:mm a')}</p>
                  <p>{event.eventAddress}, {event.eventLocation}</p>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    )
  }
}

export default DiscoverNow;
