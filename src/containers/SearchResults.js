import React, { Component } from 'react';
import './SearchResults.css';
import moment from 'moment';

 class SearchResults extends Component {

  render() {
      const {events} = this.props.location.state;
      console.log(events);

    return (
      <div className="body-search">
        <div className="content">
          <h3>Search Results</h3>
          {events.map(event =>
            <a key={event.eventId} href={`eventDetails/${event.eventId}`}>
              <div className="Events">
                <div className="event-image">
                  <img src={`${event.eventPicture}`} alt="event" />
                </div>
                <div className="event-description">
                  <p>{moment(event.eventStartTime).format('MMMM DD, YYYY, hh:mm a')}</p>
                  <p>{event.eventAddress} {event.eventLocation}</p>
                    <h5>{event.eventTitle}</h5>
                    <p>Tickets Left: {event.remainingTickets}</p>
                    
                  </div>
              </div>
            </a>
          )}
        </div>
      </div>
    )
  }
}
export default SearchResults;
