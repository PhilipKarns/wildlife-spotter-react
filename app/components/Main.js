//include Main react dependencies
import React, { Component } from "react";
import GoogleMap from "./children/Google_Map";
import Form from "./children/Form";

var helpers = require("./utils/helpers");

export default class Main extends Component {
  constructor(props) {
  	super(props);
    this.state = { 
    	imagePreviewURL: "", 
    	imageLatitude: 0,
    	imageLongitude: 0,
    	imageDate: null
    };
    this.setImage = this.setImage.bind(this);
    this.setLatitude = this.setLatitude.bind(this);
    this.setLongitude = this.setLongitude.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  	setImage(imageURL) {
		this.setState({
			imagePreviewURL: imageURL
		});
	}
	setLatitude(latitude) {
		this.setState({
			imageLatitude: latitude
		});
	}
	setLongitude(longitude) {
		this.setState({
			imageLongitude: longitude
		});
	}
	setDate(date) {
		this.setState({
			imageDate: date
		});
	}
	componentDidUpdate(prevProps, prevState) {
		console.log("component updated");
		var coords = [this.state.imageLongitude, this.state.imageLatitude];
		helpers.postHistory("www.google.com", this.state.imageDate, coords).then(function() {
			console.log("info sent to server to update DB");	
		}.bind(this));
	}
	render() {
		return(
			<div className="container" style={{height: "100%"}}>
				<div className="row" style={{height: "100%"}}>
					<div className="jumbotron">
						<h2 className="text-center">Spotimal</h2>
						<p className="text-center">You Spot Wildlife. You Share Geotagged Images. Others Spot the Wildlife.</p> 
					</div>
					<div className="col-md-12" id="google-map" style={{height: "50%"}}>
						<GoogleMap lat={this.state.imageLatitude} lng={this.state.imageLongitude} image={this.state.imagePreviewURL}/>
					</div>
					<div className="col-md-12">
						{/*This will be the code we pass to the form Component*/}						
						<Form setImage={this.setImage} setLatitude={this.setLatitude} setLongitude={this.setLongitude}
						setDate={this.setDate}/>
					</div>
				</div>
			</div>
		);
	}
}
