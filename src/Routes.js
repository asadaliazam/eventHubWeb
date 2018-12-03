import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import NotFound from "./containers/NotFound";
import Login from "./containers/Login";
import AppliedRoute from "./components/AppliedRoute";
import Signup from "./containers/Signup";
// import NewNote from "./containers/NewNote";
// import Notes from "./containers/Notes";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import SearchResults from "./containers/SearchResults";
import eventDetails from "./containers/EventDetails";
import Register from "./containers/Register";
import AboutUs from "./containers/AboutUs";
import Contact from "./containers/Contact";
import CreateEvent from "./containers/CreateEvent";
import MyEvents from "./containers/MyEvents";
import PersonalityTest from "./containers/PersonalityTest";
import ProfilePage from "./containers/ProfilePage";
import DiscoverNow from "./containers/DiscoverNow";
import Preferences from "./containers/Preferences";






export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
    <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
    <Route path="/searchResults/" exact component={SearchResults} props={childProps} />
    <Route path="/eventDetails/:id" exact component={eventDetails} props={childProps} />
    <Route path="/about" exact component={AboutUs} props={childProps} />
    <Route path="/contact" exact component={Contact} props={childProps} />


    {/* <AuthenticatedRoute path="/notes/new" exact component={NewNote} props={childProps} /> */}
    {/* <AuthenticatedRoute path="/notes/:id" exact component={Notes} props={childProps} /> */}
    <AuthenticatedRoute path="/register" exact component={Register} props={childProps} />
    <AuthenticatedRoute path="/createevent" exact component={CreateEvent} props={childProps} />
    <AuthenticatedRoute path="/myevents" exact component={MyEvents} props={childProps} />
    <AuthenticatedRoute path="/personalitySurvey" exact component={PersonalityTest} props={childProps} />
    <AuthenticatedRoute path="/profile" exact component={ProfilePage} props={childProps} />
    <AuthenticatedRoute path="/discover" exact component={DiscoverNow} props={childProps} />
    <AuthenticatedRoute path="/preferences" exact component={Preferences} props={childProps} />








    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;
