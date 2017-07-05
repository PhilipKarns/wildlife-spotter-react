//include Main react dependencies
import React, { Component } from "react";
import GoogleMap from "./children/Google_Map";

export default class Main extends Component {

	render() {
		return(
			<div className="container" style={{height: "100%"}}>
				<div className="row" style={{height: "100%"}}>
					<div className="jumbotron">
						<h2 className="text-center">Spotimal</h2>
						<p className="text-center">You Spot Wildlife. You Share Geotagged Images. Others Spot the Wildlife.</p> 
					</div>
					<div className="col-md-12" id="google-map" style={{height: "100%"}}>
						<GoogleMap />
					</div>
				</div>
			</div>
		);
	}
}