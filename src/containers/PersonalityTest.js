import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { reactLocalStorage } from 'reactjs-localstorage';
import "./PersonalityTest.css";
import axios from 'axios';
import { WithContext as ReactTags } from 'react-tag-input';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

class PersonalityTest extends Component {

    static defaultProps = {
        types: ['Training or Workshop', 'Networking Event', 'Social Gathering'],
        topics: ['Science or Technology', 'Business or Professional', 'Film, Media or Entertainment']
    }

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag = this.handleDrag.bind(this);

        this.state = {
            tags: [],
            suggestions: [
                { id: 'Quantum', text: 'Quantum' },
                { id: 'HTML', text: 'HTML' },
                { id: 'CSS', text: 'CSS' },
                { id: 'JavaScript', text: 'JavaScript' },
                { id: 'React', text: 'React' },
                { id: 'Vue.js', text: 'Vue.js' },
                { id: 'React-Native', text: 'React-Native' },
                { id: 'Climate', text: 'Climate' },
                { id: 'Weather', text: 'Weather' },
                { id: 'Environment', text: 'Environment' },
                { id: 'Development', text: 'Development' },
                { id: 'Design', text: 'Design' },
                { id: 'Graphics', text: 'Graphics' },
                { id: 'Medical', text: 'Medical' },
                { id: 'Drugs', text: 'Drugs' },
                { id: 'Brain', text: 'Brain' },
                { id: 'Heart', text: 'Heart' },
                { id: 'Doctor', text: 'Doctor' },
                { id: 'Nurse', text: 'Nurse' },
                { id: 'Scientist', text: 'Scientist' },
                { id: 'Dentist', text: 'Dentist' },
                { id: 'Physics', text: 'Physics' },
                { id: 'Computing', text: 'Computing' },
                { id: 'Microsoft', text: 'Microsoft' },
                { id: 'Amazon', text: 'Amazon' },
                { id: 'Google', text: 'Google' },
                { id: 'Surgery', text: 'Surgery' },
                { id: 'Medicine', text: 'Medicine' },
                { id: 'Awareness', text: 'Awareness' },
                { id: 'Veterinarian', text: 'Veterinarian' },
                { id: 'Space', text: 'Space' },
                { id: 'Pregnancy', text: 'Pregnancy' },
                { id: 'Data', text: 'Data' },
                { id: 'Health', text: 'Health' },
                { id: 'Diet', text: 'Diet' },
                { id: 'Finance', text: 'Finance' },
                { id: 'Accountant', text: 'Accountant' },
                { id: 'Accounting', text: 'Accounting' },
                { id: 'Economist', text: 'Economist' },
                { id: 'Supply Chain', text: 'Supply Chain' },
                { id: 'Cryptocurrency', text: 'Cryptocurrency' },
                { id: 'Auditor', text: 'Auditor' },
                { id: 'GAAP', text: 'GAAP' },
                { id: 'IAS', text: 'IAS' },
                { id: 'Business Plan', text: 'Business Plan' },
                { id: 'Tax', text: 'Tax' },
                { id: 'Entrepreneur', text: 'Entrepreneur' },
                { id: 'Investor', text: 'Investor' },
                { id: 'Budget', text: 'Budget' },
                { id: 'Shareholder', text: 'Shareholder' },
                { id: 'Risk Management', text: 'Risk Management' },
                { id: 'Analysis', text: 'Analysis' },
                { id: 'Banking', text: 'Banking' },
                { id: 'Human Resources', text: 'Human Resources' },
                { id: 'Lawyer', text: 'Lawyer' },
                { id: 'Amendments', text: 'Amendments' },
                { id: 'PWC', text: 'PWC' },
                { id: 'BDO', text: 'BDO' },
                { id: 'Credit', text: 'Credit' },
                { id: 'Loan', text: 'Loan' },
                { id: 'CIBC', text: 'CIBC' },
                { id: 'BMO', text: 'BMO' },
                { id: 'International', text: 'International' },
                { id: 'Local', text: 'Local' },
                { id: 'Debts', text: 'Debts' },
                { id: 'Wall Street', text: 'Wall Street' },
                { id: 'Markets', text: 'Markets' },
                { id: 'Shares', text: 'Shares' },
                { id: 'Film Making', text: 'Film Making' },
                { id: 'Choreography', text: 'Choreography' },
                { id: 'Music', text: 'Music' },
                { id: 'Acting', text: 'Acting' },
                { id: 'Actor', text: 'Actor' },
                { id: 'Lyrists', text: 'Lyrists' },
                { id: 'Poetry', text: 'Poetry' },
                { id: 'Cinema', text: 'Cinema' },
                { id: 'Movies', text: 'Movies' },
                { id: 'Classics', text: 'Classics' },
                { id: 'Disaster', text: 'Disaster' },
                { id: 'Action', text: 'Action' },
                { id: 'Comedy', text: 'Comedy' },
                { id: 'Thriller', text: 'Thriller' },
                { id: 'Horror', text: 'Horror' },
                { id: 'Sports', text: 'Sports' },
                { id: 'Soccer', text: 'Soccer' },
                { id: 'Football', text: 'Football' },
                { id: 'Hockey', text: 'Hockey' },
                { id: 'Baseball', text: 'Baseball' },
                { id: 'Basketball', text: 'Basketball' },
                { id: 'Hollywood', text: 'Hollywood' },
                { id: 'Bollywood', text: 'Bollywood' },
                { id: 'Hip-Hop', text: 'Hip-Hop' },
                { id: 'Rap', text: 'Rap' },
                { id: 'RnB', text: 'RnB' },
                { id: 'Soul', text: 'Soul' },
                { id: 'Rock', text: 'Rock' },
                { id: 'Indie', text: 'Indie' },
                { id: 'Singers', text: 'Singers' },
                { id: 'Band', text: 'Band' },
                { id: 'Athletics', text: 'Athletics' },
                { id: 'News', text: 'News' },
                { id: 'Politics', text: 'Politics' },
                { id: 'Facebook', text: 'Facebook' },
                { id: 'Twitter', text: 'Twitter' },
                { id: 'Instagram', text: 'Instagram' },
                { id: 'YouTube', text: 'YouTube' },
                { id: 'Romance', text: 'Romance' },
                { id: 'Myths', text: 'Myths' },
                { id: 'Concert', text: 'Concert' },
                { id: 'Stunts', text: 'Stunts' },
            ],
            redirect: false,
            eventType: 'Training or Workshop',
            eventTopic: 'Science or Technology'
        };
    }
    handleDelete(i) {
        const { tags } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({ tags: [...state.tags, tag] }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ tags: newTags });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleFormSubmission(e) {
        e.preventDefault();
        let obj2 = [];
        for (var j = 0; j < this.state.tags.length; j++) {
            console.log(this.state.tags[j].id);
            obj2.push(this.state.tags[j].id);
        }
        let userData = {
            eventType: this.state.eventType,
            eventTopic: this.state.eventTopic,
            tags: obj2,
            email: reactLocalStorage.get('email'),
        }

        axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/insertPersonalityTestData`, { userData })
            .then(res => {

            })
            .catch(err => console.log(err));

        let data = {
            email: reactLocalStorage.get('email'),
        }

        axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/setLogin`, { data })
            .then(res => {
                reactLocalStorage.set('firstLogin', 'false');
                this.setState({ redirect: true });
            })
            .catch(err => console.log(err));



    }
    render() {
        const { tags, suggestions } = this.state;
        let topicOptions = this.props.topics.map(topic => {
            return <option key={topic} value={topic}>{topic}</option>
        });
        let typeOptions = this.props.types.map(type => {
            return <option key={type} value={type}>{type}</option>
        });
        const { redirect } = this.state;
        if (redirect) {
            return (
                <Redirect to={{
                    pathname: '/',
                }} />

            );
        }
        return (
          <div className="sub-body">
            <div className="PersonalityTest card card-body mb-4 p-4">
                <h3 className="display-4 text-center">
                    Personality Survey
                </h3>
                <form onSubmit={this.handleFormSubmission}>
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
                    <div className="Tags">
                        <ReactTags tags={tags}
                            suggestions={suggestions}
                            handleDelete={this.handleDelete}
                            handleAddition={this.handleAddition}
                            handleDrag={this.handleDrag}
                            delimiters={delimiters} />
                    </div>
                    <button className="btn btn-primary btn-lg btn-block mb-5" type="submit">Submit</button>
                </form>
            </div>
          </div>
        );
    }
}

export default PersonalityTest;
