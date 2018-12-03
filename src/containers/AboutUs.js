import React, { Component } from 'react';
import './AboutUs.css'
import img1 from '../navrose.png';
import img2 from '../monika.jpg';
import img4 from '../grible.JPG';
import img3 from '../asad.jpg';
import img5 from '../samantha.jpg';


class AboutUs extends Component {
  render() {
    return (
      <div className="body">
        <div className="AboutUs">
          <h3>Team Members</h3>
          <p className="intro">As many of us were required to attend events, we noticed how an event on one Event app is not present on another Event app. After researching, we conclude that we could construct an Event app that would house, not on events posted on the app but, events from other Event apps as well.</p>
          <div className="Members Navrose">
            <div className="member-image">
              <img src={img1} alt="Navrose"/>
            </div>
            <div className="member-description">
              <a className="member-name" href="https://www.linkedin.com/in/navrose-rikhi">Navrose Sharma</a>
              <p>Project Manager/Mobile Platform Developer</p>
            </div>
          </div>
          <div className="Members Monika">
            <div className="member-image">
              <img src={img2} alt="Monika"/>
            </div>
            <div className="member-description">
              <a className="member-name" href="https://www.linkedin.com/in/monika-sharma-427625b8/">Monika Sharma</a>
              <p>UX Designer</p>
            </div>
          </div>
          <div className="Members Asad">
            <div className="member-image">
              <img src={img3} alt="Asad"/>
            </div>
            <div className="member-description">
              <a className="member-name" href="https://www.linkedin.com/in/asadaliazam/">Asad Azam</a>
              <p>Back-End Developer/Mobile Platform Developer</p>
            </div>
          </div>
          <div className="Members Grible">
            <div className="member-image">
              <img src={img4} alt="Grible"/>
            </div>
            <div className="member-description">
              <a className="member-name" href="https://www.linkedin.com/in/grible-shaji-160557158/">Grible Shaji</a>
              <p>UI Designer</p>
            </div>
          </div>
          <div className="Members Samantha">
            <div className="member-image">
              <img src={img5} alt="Samantha"/>
            </div>
            <div className="member-description">
              <a className="member-name" href="https://www.linkedin.com/in/samantha-singh-developer/">Samantha Singh</a>
              <p>Front-End Developer</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AboutUs;
