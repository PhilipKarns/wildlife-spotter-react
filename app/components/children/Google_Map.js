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
		const latitude = this.state.currentLocation.lat;
		const longitude = this.state.currentLocation.lng;
		
		this.map = new google.maps.Map(this.refs.map, {
			center: {lat: latitude, lng: longitude},
			zoom: 12
		});
		        //HTML5 geolocation.
	          navigator.geolocation.getCurrentPosition((position) => {
	             const pos = position.coords;
	              this.setState({
	              	currentLocation: {
	              		lat: pos.latitude,
	              		lng: pos.longitude
	              	}
	              })
	            	          	console.log(position);
	          	console.log(position.coords.latitude);
			  	console.log(pos.latitude + pos.longitude);
			  });
	
	}

	render() {
		return (
			<div id="map" ref="map" />
		);
	}	
}