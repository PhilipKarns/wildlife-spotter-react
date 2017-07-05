//add dependencies
import React, { Component } from "react";

export default class GoogleMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentLocation: {
			lat: 0,
			lng: 0
			}
		}
	}	
	componentDidMount() {

      //get the user's current location and update the state with the lat/lng
      navigator.geolocation.getCurrentPosition((position) => {
         const pos = position.coords;
          this.setState({
          	currentLocation: {
          		lat: pos.latitude,
          		lng: pos.longitude
          	}
          });
		//save the latitude and longitude of the state in variables       
		const myLatitude = this.state.currentLocation.lat;
		const myLongitude = this.state.currentLocation.lng;
		console.log(myLatitude);
		console.log(myLongitude);
		console.log(this.state.currentLocation);
		//create the map with the current state of latitude and longitude
		this.map = new google.maps.Map(this.refs.map, {
			center: {lat: myLatitude, lng: myLongitude},
			zoom: 12
		});	              

       	console.log(position);
      	console.log(position.coords.latitude);
	  	console.log(pos.latitude, pos.longitude);
	  });
	
	}

	render() {
		return (
			<div id="map" ref="map" />
		);
	}	
}