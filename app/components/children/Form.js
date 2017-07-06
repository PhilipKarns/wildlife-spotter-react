//include Main react dependencies
import React, { Component } from "react";
import EXIF from "exif-js";

export default class Form extends Component {
  constructor(props) {
  	super(props);
    this.state = { 
      image: "", 
      imagePreviewURL: "", 
      imageCoords: "" 
    };
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);    
  }

  handleFileChange(event) {
    event.preventDefault();

    var reader= new FileReader();
    var file = event.target.files[0];
    console.log(file);

    reader.onloadend = function() {
     
      this.setState({
        image: file,
        imagePreviewURL: reader.result
      });
    }.bind(this)
    //this gets the metadata from the image
    EXIF.getData(file, function() {
      //console.log(EXIF.pretty(file));
      console.log(EXIF.getTag(this, "GPSLatitude"));
      console.log(EXIF.getTag(this, "GPSLongitude"));
      console.log(EXIF.getTag(this, "GPSLongitudeRef"));
      //get the data and convert it to decimals, which can be sent to Google Maps
      var lat = EXIF.getTag(this, "GPSLatitude");
      var lng = EXIF.getTag(this, "GPSLongitude");
      var latRef = EXIF.getTag(this, "GPSLatitudeRef");
      var lngRef = EXIF.getTag(this, "GPSLongitudeRef");
      lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
      lng = (lng[0] + lng[1]/60 + lng[2]/3600) * (lngRef == "W" ? -1 : 1);
      console.log(lat, lng);      

    });

    //this calls the reader.onloadend function
    reader.readAsDataURL(file);
    //reader.readAsBinaryString(file);
    console.log(reader);
  }

  handleSubmit(event) {
      event.preventDefault();
      this.setState({ image: "" });
      this.props.setImage(this.state.imagePreviewURL);
      this.setState({ imagePreviewURL: "" });
  }

  render() {
    var imagePreviewURL = this.state.imagePreviewURL;
    var $imagePreview = null;
    if(imagePreviewURL) {
      $imagePreview = (<img src={imagePreviewURL} height="25%" width="25%" />);
    }
    else {
      $imagePreview = (<div className="previewText">Please select an image for preview</div>);
    }
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Image Upload</h3>
        </div>
        <div className="panel-body text-center">
        	<form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <h4 className="">
                <strong>Image</strong>
              </h4>

              {/*
                Note how each of the form elements has an id that matches the state.
                This is not necessary but it is convenient.
                Also note how each has an onChange event associated with our handleChange function.
              */}
              <input
                type="file"
                className="form-control text-center"
                id="image"
                accept="image/*"
                onChange={this.handleFileChange}
              />
              <br />
              <div className="preview">
              	
              </div>
              <button
                className="btn btn-primary"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
          {$imagePreview}
        </div>
      </div>
    );
  }		
}
