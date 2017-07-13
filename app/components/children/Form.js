//include Main react dependencies
import React, { Component } from "react";
import EXIF from "exif-js";

export default class Form extends Component {
  constructor(props) {
  	super(props);
    this.state = { 
      image: "", 
      imagePreviewURL: "", 
      imageLatitude: 0,
      imageLongitude: 0,
      imageDate: null 
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
     var lat;
     var lng;
     //the "this" in this.setState would typically look to the onloadend method
     //but we want to update the state of the Form class, so we have to put .bind
     //at the end of the onloadend method at line 54, which will bypass this method
     //and look up a level to the form
      this.setState({
        image: file,
        imagePreviewURL: reader.result
      });
      
      //this.props.setImage(reader.result);

      //this gets the metadata from the image
      EXIF.getData(file, function() {
        //console.log(EXIF.pretty(file));
        // console.log(EXIF.getTag(file, "GPSLatitude"));
        // console.log(EXIF.getTag(file, "GPSLongitude"));
        // console.log(EXIF.getTag(file, "GPSLongitudeRef"));
        //get the data and convert it to decimals, which can be sent to Google Maps
        lat = EXIF.getTag(file, "GPSLatitude");
        lng = EXIF.getTag(file, "GPSLongitude");
        var date = EXIF.getTag(file, "DateTime");
        var latRef = EXIF.getTag(file, "GPSLatitudeRef");
        var lngRef = EXIF.getTag(file, "GPSLongitudeRef");
        lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);  
        lng = (lng[0] + lng[1]/60 + lng[2]/3600) * (lngRef == "W" ? -1 : 1);
        //console.log(lat, lng);
        this.setState({imageLatitude: lat});
        this.setState({imageLongitude: lng});
        this.setState({imageDate: date});
      //in order to get this.setState to look update the state of the Form class
      //we have to put .bind at the end of the EXIF function on line 26. "this"
      //then look up a level to the onloadend function that it's nested in.
      //because onloadend also has a .bind on line 59, "this" then looks up 
      //another level to the Form and can update the state.  
      }.bind(this));     
    }.bind(this);

    //this calls the reader.onloadend function
    reader.readAsDataURL(file);
    //console.log(reader);
  }

  handleSubmit(event) {
      event.preventDefault();
      this.setState({ image: "" });
      this.props.setImage(this.state.imagePreviewURL);
      this.setState({ imagePreviewURL: "" });
      this.props.setLatitude(this.state.imageLatitude);
      this.setState({ imageLatitude: 0 });
      this.props.setLongitude(this.state.imageLongitude);
      this.setState({ imageLongitude: 0 });
      this.props.setDate(this.state.imageDate);
      this.setState({ imageDate: null });      
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
        	<form onSubmit={this.handleSubmit} method="post" enctype="multipart/form-data">
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
