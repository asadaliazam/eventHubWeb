import React, { Component } from 'react';
import "./EventDetails.css";



class ViewCheckedInDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.match.params.id,
        };
    }

    registerEvent = (e) => {
        e.preventDefault();
        this.setState ({redirect : true});
    }

    componentDidMount() {

}


  render() {
    
    return (
        <React.Fragment>
        <div className="sub-body-EventDetails">
            <div className="EventDetails">
                <p>This feature is currently unavailable.</p>
            </div>
        </div>
    </React.Fragment>
    )
  }


}

export default ViewCheckedInDetails;
