//add dependencies
import React, { Component } from "react";

var helpers = require("../utils/helpers");

export default class GoogleMap extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentLocation: {
			lat: 0,
			lng: 0,
			imageHistory: []
			}
		}
	}	
	
	shouldComponentUpdate() {
		return false;	
	}

	componentWillReceiveProps(nextProps) {		
		this.map.panTo({ lat: nextProps.lat, lng: nextProps.lng });

		// this.map = new google.maps.Map(this.refs.map, {
		// 	center: {lat: myLatitude, lng: myLongitude},
		// 	zoom: 12
		// });	              
		const map = this.map;

		this.marker = new google.maps.Marker({
          // The below line is equivalent to writing:
          // position: new google.maps.LatLng(-34.397, 150.644)
          position: {lat: nextProps.lat, lng: nextProps.lng},
          map: map
        });
        //if I don't set this.marker to a single-word variable, it causes issues when using methods of the google api like .getPosition()
        const marker = this.marker;

        this.infowindow = new google.maps.InfoWindow({
        	content: "<p>Marker Location:" + marker.getPosition() + "</p>" + "<img src='http://mypages.valdosta.edu/makirkley/braves.jpg' height='50px' width='50px'/>"
        });
        //if I don't set this.infowindow to a single-word variable, it causes issues when using methods of the google api like .open()
        const infowindow = this.infowindow;
        google.maps.event.addListener(this.marker, "click", function() {
        	infowindow.open(map, marker);
        });		

	}
	componentDidMount() {
		helpers.getHistory().then(function(response) {
			console.log(response);
			if(response.data !== this.state.imageHistory) {
				console.log("History", response.data);
				this.setState({ imageHistory: response.data });
				console.log(this.state.imageHistory);				
			}	
		}.bind(this));		
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
		const map = this.map;

		this.marker = new google.maps.Marker({
          // The below line is equivalent to writing:
          // position: new google.maps.LatLng(-34.397, 150.644)
          position: {lat: myLatitude, lng: myLongitude},
          map: map
        });
	              				
        for (let i = 0; i < this.state.imageHistory.length; i++) {
		this.marker = new google.maps.Marker({
          // The below line is equivalent to writing:
          // position: new google.maps.LatLng(-34.397, 150.644)
          position: {lat: this.state.imageHistory[i].geometry.coordinates[1], lng: this.state.imageHistory[i].geometry.coordinates[0]},
          map: map
        });	  	
	   
        //if I don't set this.marker to a single-word variable, it causes issues when using methods of the google api like .getPosition()
        const marker = this.marker;

        this.infowindow = new google.maps.InfoWindow({
        	content: "<p>Marker Location:" + marker.getPosition() + "</p>" + "<img src='http://mypages.valdosta.edu/makirkley/braves.jpg' height='50px' width='50px'/>"
        });
        //if I don't set this.infowindow to a single-word variable, it causes issues when using methods of the google api like .open()
        const infowindow = this.infowindow;
        google.maps.event.addListener(this.marker, "click", function() {
        	infowindow.open(map, marker);
        });
        }

	  });


	  //SHOULD WE TRY TO DO A .THEN HERE AND ADD THE HISTORY? I WOULD ALSO LIKELY NEED TO ADD CODE TO THE 
	  //COMPONENTWILLRECEIVEPROPS METHOD SO NEW ADDITIONS WILL SHOW ON THE MAP? OR COULD I INSTEAD JUST ADD A LOOP IN JSX TO 
	  //ADD THE HISTORY AS IT'S LOADED AND ADDED, LIKE WE DID WITH ADDRESS APP?
	
	}

	render() {
		return (
			<div id="map" ref="map" />
		);
	}	
}