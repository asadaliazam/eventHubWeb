import React, { Component } from 'react';
import {reactLocalStorage} from 'reactjs-localstorage';
import avatar from '../avatar.png';
import LoaderButton from "../components/LoaderButton";
import axios from 'axios';
import './ProfilePage.css'

class ProfilePage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      profileInformation : [],
    };
  }

    componentDidMount() {
        let data = {
            email : reactLocalStorage.get('email'),
          }

        axios.post(`https://us-central1-testingexpress-216900.cloudfunctions.net/test/api/getProfileInformation`, { data })
            .then(res => {
              console.log(res.data);
              this.setState({profileInformation:res.data});
            })
          .catch((error) => {
            console.log(error);
          });
    }

    render() {
        return (
            <div className="sub-body">
              <div className="MyProfile">
                <h3>My Profile</h3>
                {this.state.profileInformation.map(user =>
                  <div className="profile" key={user.email}>
                    <div className="profile-info">
                      <div className="profile-top">
                        <div className="profile-image">
                          <img src={avatar} alt="user"/>
                        </div>
                        <div className="profile-description">
                          <div className="profile-name user">
                            <h6>Name: </h6>
                            <p>{user.name}</p>
                          </div>
                          <div className="profile-email user">
                            <h6>Email: </h6>
                            <p>{user.email}</p>
                          </div>
                          <button className="buttontype">Edit</button>
                        </div>
                      </div>
                      <div className="profile-topic user">
                        <h6>Favorite Event Topic: </h6>
                        <p>{user.eventTopicInterestedIn}</p>
                      </div>
                      <div className="profile-type user">
                        <h6>Favorite Event Type: </h6>
                        <p>{user.typeOfEventInterestedIn}</p>
                      </div>
                      <div className="profile-tag">
                        <h6>Favorite Tags: </h6>
                        <div className="tags">
                          {user.tagsInterestedIn.map(tags =>
                            <li>{tags}</li>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <LoaderButton
                  block
                  bsSize="large"
                  type="submit"
                  text="Save"
                  loadingText="Changes Saved"
                />
              </div>
            </div>
        )
    }
}
export default ProfilePage;
