//include Main react dependencies
import React, { Component } from "react";
import GoogleMap from "./children/Google_Map";
import Form from "./children/Form";

export default class Main extends Component {
  constructor(props) {
  	super(props);
    this.state = { 
    	imagePreviewURL: "", 
    	imageCoords: "" 
    };
  }

  setImage(imageURL) {
		this.setState({
			imagePreviewURL: imageURL
		});
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
						<GoogleMap />
					</div>
					<div className="col-md-12">
						{/*This will be the code we pass to the form Component*/}						
						<Form setImage={this.setImage} setCoords={this.setCoords} />
					</div>
				</div>
			</div>
		);
	}
}
