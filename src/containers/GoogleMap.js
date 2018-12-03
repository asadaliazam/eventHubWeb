import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker  } from 'react-google-maps';
class Map extends Component {
   render(props) {
       let lat = parseFloat(this.props.location.lat);
       let lng = parseFloat(this.props.location.long)
       console.log(lat, lng);
   const GoogleMapExample = withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { { lat: lat, lng: lng } }
        defaultZoom = { 16 }
      >
      <Marker position={{ lat: lat, lng: lng }} />
      </GoogleMap>
   ));
   return(
      <div>
        <GoogleMapExample
          containerElement={ <div style={{ height: `200px`, width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
   );
   }
};
export default Map;