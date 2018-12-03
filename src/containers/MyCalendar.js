import React, {Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyCalendar.css';
import ReactModal from 'react-modal';


const localizer = BigCalendar.momentLocalizer(moment)

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class MyCalendar extends Component {
  constructor (props) {
    super(props);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.state = {
      events : [],
      showModal: false,
      modalEvent: []
    };
  }

  componentDidMount () {
    ReactModal.setAppElement('body');
    if (this.props.events.length > 0)
    {
    let newListOfEvents = [];
    for (let i = 0 ; i<this.props.events.length ; i++) {
      let date = new Date (this.props.events[i].eventStartTime);
      let newEvent = { 'id':this.props.events[i].eventId, 'title':this.props.events[i].eventTitle, 'allDay':false, 'start':new Date(date), 'end': new Date(date),  };
      newListOfEvents.push(newEvent);
    }


    this.setState({events: newListOfEvents});
    }

  }

  componentWillReceiveProps(props) {

    if (props.events.length > 0)
    {
    let newListOfEvents = [];
    for (let i = 0 ; i<props.events.length ; i++) {
      let date = new Date (props.events[i].eventStartTime);
      let newEvent = { 'id':props.events[i].eventId, 'title':props.events[i].eventTitle, 'allDay':false, 'start':new Date(date), 'end': new Date(date),  };
      newListOfEvents.push(newEvent);
    }


    this.setState({events: newListOfEvents});
    }

  }

  selectEvent(event, e) {

    console.log(event);
    this.setState({ modalEvent:event, showModal: true })

  }

  handleCloseModal () {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <div id = "calendar" className = "calendar">
       <BigCalendar popup
         events={this.state.events}
         localizer={localizer}
         startAccessor="start"
         endAccessor="end"
         onSelectEvent = {this.selectEvent.bind(this)}
       />
       <ReactModal
             isOpen={this.state.showModal}
             style={customStyles}
          >
          <p>{this.state.modalEvent.id}</p>
            <button onClick={this.handleCloseModal}>Close Modal</button>

        </ReactModal>
      </div>
    )
  }
}

export default MyCalendar;
