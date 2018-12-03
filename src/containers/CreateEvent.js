import React, { Component } from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';
import './CreateEvent.css';
import DateTimePicker from 'react-datetime-picker';
import LoaderButton from "../components/LoaderButton";
import axios from 'axios';
import S3FileUpload from 'react-s3';
import {reactLocalStorage} from 'reactjs-localstorage';
import moment from 'moment';
import ReactModal from 'react-modal';

const config = {
  bucketName: 'event-hub-pictures',
  dirName: 'event-photos', /* optional */
  region: 'us-west-2',
  accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
}

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

class CreateEvent extends Component {

  constructor (props) {
    console.log(config);
    ReactModal.setAppElement('body');
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleFormSubmission = this.handleFormSubmission.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);

    this.state = {
      showModal: false,
      eventTitle : '',
      eventLocation: '',
      eventAddress: '',
      eventStartTime: new Date(),
      eventEndTime: new Date(),
      eventSummary: '',
      eventDescription: '',
      numberOfTickets: 0,
      eventType: 'Training or Workshop',
      eventTopic: 'Science or Technology',
      eventPicture: '',
      eventCreatedBy: '',
      createdEventId: ''
    };
  }

  static defaultProps = {
    types: ['Training or Workshop','Networking Event','Social Gathering'],
    topics: ['Science or Technology','Business or Professional','Film, Media or Entertainment']
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleLocation = event => {
    console.log(event);
  }

  onSuggestSelect(suggest) {
    if (suggest) {
      if ( 'label' in suggest ) {
        this.setState ({ eventLocation : suggest.label })
      }
    }
  }

  onChangeStartDate(date) {
    this.setState({ eventStartTime: date })
  }

  onChangeEndDate(date) {
    this.setState({ eventEndTime: date })
  }

  handleFormSubmission(e) {
    e.preventDefault();
    this.setState({eventCreatedBy:reactLocalStorage.get('email')}, () => {
      let dateStringStart = moment(this.state.eventStartTime).format("YYYY-MM-DD hh:mm:ss");
      let dateStringEnd = moment(this.state.eventEndTime).format("YYYY-MM-DD hh:mm:ss");
      let tags = [ 'HTML', 'CSS', 'JavaScript', 'React', 'Vue.js', 'React Native', 'Climate', 'Weather', 'Environment', 'Development', 'Design', 'Graphics', 'Medical', 'Drugs', 'Brain', 'Heart', 'Doctor', 'Nurse', 'Scientist', 'Dentist', 'Physics', 'Quantum', 'Computing', 'Microsoft', 'Amazon', 'Google', 'Surgery', 'Medicine', 'Awareness', 'Veterinarian', 'Space', 'Pregnancy', 'Data', 'Health', 'Diet', 'Finance', 'Accountant', 'Accounting', 'Economist', 'Supply Chain', 'Cryptocurrency', 'Auditor', 'GAAP', 'IAS', 'Business Plan', 'Tax', 'Entrepreneur', 'Investor', 'Budget', 'Shareholder', 'Risk Management', 'Analysis', 'Banking', 'Human Resources', 'Lawyer', 'Amendments', 'PWC', 'BDO', 'Credit', 'Loan', 'CIBC', 'BMO', 'International', 'Local', 'Debts', 'Wall Street', 'Markets', 'Shares', 'Film Making', 'Choreography', 'Music', 'Acting', 'Actor', 'Lyrists', 'Poetry', 'Cinema', 'Movies', 'Classics', 'Disaster', 'Action', 'Comedy', 'Thriller', 'Horror', 'Sports', 'Soccer', 'Football', 'Hockey', 'Baseball', 'Basketball', 'Drama', 'Hollywood', 'Bollywood', 'Hip-Hop', 'Rap', 'RnB', 'Soul', 'Rock', 'Indie', 'Singers', 'Band', 'Athletics', 'News', 'Politics', 'Facebook', 'Twitter', 'Instagram', 'YouTube', 'Romance', 'Myths', 'Concert', 'Stunts' ]

      let eventTags = [];
      this.state.eventDescription.split(" ").forEach(function (item) {
        for (let i = 0; i < tags.length; i++) {
          if (item.match(new RegExp(tags[i], "ig"))) {
            eventTags.push(item);
          }
        }
    });

    console.log(eventTags);

      let data = {
        eventTitle : this.state.eventTitle,
        eventAddress : this.state.eventAddress,
        eventStartTime: dateStringStart,
        eventEndTime: dateStringEnd,
        eventLocation: this.state.eventLocation,
        eventSummary: this.state.eventSummary,
        eventDescription: this.state.eventDescription,
        numberOfTickets: this.state.numberOfTickets,
        eventType: this.state.eventType,
        eventTopic: this.state.eventTopic,
        eventPicture: this.state.eventPicture,
        eventCreatedBy: this.state.eventCreatedBy,
        eventTags: eventTags
      }

      console.log(data);

      axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/createEvent`, { data })
            .then(res => {
                console.log(res.data[0].eventId);
                this.setState({ showModal: true, createdEventId:res.data[0].eventId })
            })
          .catch((error) => {
            console.log(error);
          });
        });
      }

  fileUpload(e) {
    e.preventDefault();
    let file = e.target.files[0];
    S3FileUpload
    .uploadFile(file, config)
    .then(data =>  {
      console.log(data);
      this.setState({eventPicture:data.location})

    })
    .catch(err => console.error(err))
    }

    handleCloseModal () {
      this.setState({ showModal: false });
    }

  render() {
    let topicOptions = this.props.topics.map(topic => {
      return <option key={topic} value={topic}>{topic}</option>
    });
    let typeOptions = this.props.types.map(type => {
      return <option key={type} value={type}>{type}</option>
    });
    return (
      <div className="sub-body">
        <div className="CreateEvent">
          <ReactModal
               isOpen={this.state.showModal}
               style={customStyles}
            >
            <a href={`eventDetails/${this.state.createdEventId}`}>View Event</a>
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>
          <h3>Create Event</h3>
          <form onSubmit={this.handleFormSubmission}>
            <FormGroup>
              <ControlLabel>Event Title</ControlLabel>
              <FormControl type="text" placeholder="Event Title"
              value={this.state.eventTitle}
              onChange={this.handleChange}
              name="eventTitle"
              />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Event Address</ControlLabel>
              <FormControl type="text" placeholder="Event Address"
              value={this.state.eventAddress}
              onChange={this.handleChange}
              name="eventAddress"
              />
            </FormGroup>

            <FormGroup className="gridDesign">
              <ControlLabel>Event Location</ControlLabel>
              <Geosuggest
              placeholder = 'Event Location'
              country = 'ca'
              name = 'eventLocation'
              value = {this.state.eventLocation}
              onChange = {this.handleLocation}
              maxFixtures = {5}
              onSuggestSelect={this.onSuggestSelect.bind(this)}
               />
            </FormGroup>

            <FormGroup className="gridDesign">
              <ControlLabel>Event starts at</ControlLabel>
              <DateTimePicker
              onChange={this.onChangeStartDate.bind(this)}
              value={this.state.eventStartTime}
              minDate= {new Date()}
              maxDetail = 'minute'
              />
            </FormGroup>

            <FormGroup className="gridDesign">
              <ControlLabel>Event ends at</ControlLabel>
              <DateTimePicker
              onChange={this.onChangeEndDate.bind(this)}
              value={this.state.eventEndTime}
              minDate= {new Date()}
              maxDetail = 'minute'
              />
            </FormGroup>

            <FormGroup controlId="formControlsImage">
              <ControlLabel>Upload Image</ControlLabel>
              <FormControl className="UploadFile" type="file" placeholder="Add File" onChange={this.fileUpload} />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Event Summary</ControlLabel>
              <FormControl
              componentClass="textarea"
              placeholder="Less than 200 words"
              value={this.state.eventSummary}
              onChange={this.handleChange}
              name="eventSummary"
               />
            </FormGroup>

            <FormGroup controlId="formControlsDescription">
              <ControlLabel>Event Description</ControlLabel>
              <FormControl
              componentClass="textarea"
              placeholder="Event Description"
              value={this.state.eventDescription}
              onChange={this.handleChange}
              name="eventDescription"
               />
            </FormGroup>

            <FormGroup controlId="formControlsTickets">
              <ControlLabel>Number of Tickets Available</ControlLabel>
              <FormControl
              type="number"
              placeholder="0"
              value={this.state.numberOfTickets}
              onChange={this.handleChange}
              name="numberOfTickets" />
            </FormGroup>

            <FormGroup>
              <ControlLabel>Event Type</ControlLabel>
              <FormControl componentClass="select" ref="type"
              value={this.state.eventType}
              onChange={this.handleChange}
              name="eventType">
                {typeOptions}
              </FormControl>
            </FormGroup>

            <FormGroup controlId="formControlsTopic">
              <ControlLabel>Event Topic</ControlLabel>
              <FormControl componentClass="select" ref="topic"
              value={this.state.eventTopic}
              onChange={this.handleChange}
              name="eventTopic">
                {topicOptions}
              </FormControl>
            </FormGroup>

            <LoaderButton
              block
              bsSize="large"
              type="submit"
              text="Launch"
              loadingText="Creating"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default CreateEvent;
