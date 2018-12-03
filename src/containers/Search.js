import React, { Component } from 'react'
import axios from 'axios';
import './Search.css'
import { Redirect } from 'react-router'
import { FormGroup, FormControl } from 'react-bootstrap';
import Geosuggest from 'react-geosuggest';

class Search extends Component {

    static defaultProps = {
        times: ['Today', 'Tomorrow', 'This Week', 'Next Week', 'Any Time']
    }

    state = {
        searchTerm: '',
        locationTerm: '',
        timeTerm: 'Today',
        events: [],
        redirect: false
    };

    findEvent = (e) => {
        e.preventDefault();
        let date = new Date();
        let month = '' + (date.getMonth() + 1);
        let day = '' + date.getDate();
        let year = date.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        let formattedDate = ([year, month, day].join('-'));

        var nextWeek = new Date(date.getTime() + 7 * 24 * 60 * 60 * 1000);
        let month2 = '' + (nextWeek.getMonth() + 1);
        let day2 = '' + nextWeek.getDate();
        let year2 = nextWeek.getFullYear();
        if (month2.length < 2) month2 = '0' + month2;
        if (day2.length < 2) day2 = '0' + day2;
        let formattedDateForNextWeek = ([year2, month2, day2].join('-'));

        let searchObject = { dateForNextWeek: formattedDateForNextWeek, date: formattedDate, text: this.state.searchTerm, location: this.state.locationTerm, time: this.state.timeTerm };




        axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/searchEvents`, { searchObject })
            .then(res => {
                this.setState({ events: res.data }, function () {
                    this.setState({ redirect: true })
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    onSuggestSelect(suggest) {
        if (suggest) {
            if ('label' in suggest) {
                this.setState({ locationTerm: suggest.label })
            }
        }
    }

    render() {
        let timeOptions = this.props.times.map(time => {
            return <option key={time} value={time}>{time}</option>
        });
        const { redirect } = this.state;
        if (redirect) {
            return (<Redirect to={{
                pathname: '/searchResults',
                state: { events: this.state.events }
            }} />)
        }
        return (
            <div className="card card-body mb-4 p-4">
                <form className="Search" onSubmit={this.findEvent.bind(this)}>
                    <FormGroup>
                        <FormControl className="suggestion" type="text" placeholder="What"
                            value={this.state.searchTerm}
                            onChange={this.handleChange}
                            name="searchTerm"
                        />
                    </FormGroup>

                    <FormGroup>
                        <Geosuggest className="suggestion"
                            placeholder='Where'
                            country='ca'
                            value={this.state.eventLocation}
                            onSuggestSelect={this.onSuggestSelect.bind(this)}
                        />
                    </FormGroup>

                    <FormGroup>
                        <FormControl className="suggestion" componentClass="select" ref="type"
                            value={this.state.timeTerm}
                            onChange={this.handleChange}
                            name="timeTerm">
                            {timeOptions}
                        </FormControl>
                    </FormGroup>

                    <button className="btn btn-primary btn-lg btn-block mb-5" type="submit"><i className="fas fa-search"></i></button>
                </form>
            </div>
        );
    }

}

export default Search;
