import React, { Component } from 'react';
import axios from 'axios';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

const Context = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case 'SEARCH_EVENTS':
        return {
            ...state,
            track_list: action.payload,
            heading: 'Search Results'
        };
        default:
            return state;
    }
}

export class Provider extends Component {

    state = {
        event_list : [],
        heading: 'Events',
        dispatch: action => this.setState(state => reducer(state, action))
    };

    componentDidMount() {


        axios.get(`https://us-central1-gfunction-220020.cloudfunctions.net/test/api/displayEvents`)
        .then(res => {
            this.setState({event_list:res.data})
        })
        .catch(err => console.log(err));
    }

  render() {
    return (
      <Context.Provider value= {this.state}>
          {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;