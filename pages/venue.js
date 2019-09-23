import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import './styles.scss';

const VenueModel = {
  name: "",
  street: "",
  city: "",
  district: "",
  state: "",
  zip: "",
  country: "",
  latlong: "",
  url: "",
  pluscode: ""
}

const VenueCard = (props) => {
    return (
        <div>
            <div className="venue-card">
            <img src={props.venue.photo} alt="Aztec" className="venue-hero" />
            <span>{props.venue.name}</span>
            <span>{props.venue.city}</span>
            </div>
            
            <div>{props.venue.street}</div>
            <div>{props.venue.city}</div>
            <div>{props.venue.district}</div>
            <div>{props.venue.state}</div>
            <div>{props.venue.zip}</div>
            <div>{props.venue.country}</div>
            <div>{props.venue.latlong}</div>
            <div>{props.venue.url}</div>
            <div>{props.venue.pluscode}</div>
        </div>
    )
}


class VenueForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...props.venue};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSave = this.handleSave.bind(this);
      this.handleInsert = this.handleInsert.bind(this);
    }
  
    handleChange(event) {
      this.setState({[event.target.name]: event.target.value});
    }
  
    handleSave(event) {
      alert('A venue was submitted: ' + this.state.name);

      if(this.state._id){ //update
        fetch(`http://localhost:3000/api/venues/${this.state._id}`,{
          method: 'PUT', // *GET, POST, PUT, DELETE, etc.
          headers: {
              'Content-Type': 'application/json',
              // 'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: JSON.stringify(this.state), // body data type must match "Content-Type" header
      })
      .then(response => response.json());
      }else{ //insert
        
          fetch(`http://localhost:3000/api/venues`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.state), // body data type must match "Content-Type" header
        })
        .then(response => response.json());
      }
      event.preventDefault();
    }
  
    handleInsert() {
      alert('A venue was created: ' + this.state.name);

      fetch(`http://localhost:3000/api/venues`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state), // body data type must match "Content-Type" header
      })
      .then(response => response.json());
      
    }

    render() {
      return (
        <form onSubmit={this.handleSave}>

        <div className="venue-card">
            <div className="photo-drop">drop photo here
              <input type="file" />
            </div>
        
            <label>
              Name:
              <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
            </label>
            <label>
            Street:
            <input type="text" name="street" value={this.state.street} onChange={this.handleChange} />
            </label>
            <label>
            City:
            <input type="text" name="city" value={this.state.city} onChange={this.handleChange} />
          </label>
            <label>
            District:
            <input type="text" name="district" value={this.state.district} onChange={this.handleChange} />
            </label>
            <label>
            State:
            <input type="text" name="state" value={this.state.state} onChange={this.handleChange} />
            </label>
            <label>
            Zip:
            <input type="text" name="zip" value={this.state.zip} onChange={this.handleChange} />
            </label>
            <label>
            Country:
            <input type="text" name="country" value={this.state.country} onChange={this.handleChange} />
            </label>
            <label>
            latlong:
            <input type="text" name="latlong" value={this.state.latlong} onChange={this.handleChange} />
            </label>
            <label>
            url:
            <input type="text" name="url" value={this.state.url} onChange={this.handleChange} />
            </label>
            <label>
            pluscode:
            <input type="text" name="pluscode" value={this.state.pluscode} onChange={this.handleChange} />
            </label>
            

            <input type="submit" value="Save" />
            <button onClick={()=>this.handleInsert()}>New Venue</button>
          </div>

        </form>
      );
    }
  }



const Venue = (props) => {
    if(props.edit)
        return <VenueForm {...props}/>
    else
        return <VenueCard {...props}/>
}

// query param is an object that has the values from url param
//i.e. {edit:1} from  /api/venues/xxx?edit=1
Venue.getInitialProps = async ({query}) => {
    try {
      let venue_data;
      let editing = false;
      if(query.id){
        const venue_res = await fetch(`http://localhost:3000/api/venues/${query.id}`);//5d7e99915cf7f88f23f1b932
        venue_data = await venue_res.json();
        if(query.edit)
          editing = true;
      }else{
        venue_data = VenueModel;
        editing = true;
      }
      return {venue:venue_data.data,edit: editing};
    }catch (err) {
        console.log("Error", err);
    }
}   

export default Venue;