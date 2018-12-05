import React, { Component } from 'react';
import axios from 'axios';


class ViewRegisteredDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.match.params.id,
            users: [],
        };
    }

    registerEvent = (e) => {
        e.preventDefault();
        this.setState ({redirect : true});
    }

    componentDidMount() {

        axios.get(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/getRegisteredUsersDetails/${this.state.eventId}`)
        .then(res => {
            this.setState({users:res.data});
        })
        .catch(err => console.log(err));
    }


  render() {
    return (
      <React.Fragment>
        <p>The following users are registered to the event</p>
      </React.Fragment>
    )
  }

}
export default ViewRegisteredDetails;
