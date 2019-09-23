import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const PlayerModel = {
  name: "",
  handle: ""
}

const PlayerCard = (props) => {
  return (
      <div>
          <div className="player-card">
          <span>{props.player.name}</span>
          <span>{props.player.handle}</span>
          </div>
      </div>
  )
}

class PlayerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {...props.player};

    this.handleChange = this.handleChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleInsert = this.handleInsert.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSave(event) {
    alert('A player was submitted: ' + this.state.name);

    if(this.state._id){ //update
      fetch(`http://localhost:3000/api/players/${this.state._id}`,{
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(this.state), // body data type must match "Content-Type" header
    })
    .then(response => response.json());
    }else{ //insert
      
        fetch(`http://localhost:3000/api/players`,{
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
    alert('A player was created: ' + this.state.name);

    fetch(`http://localhost:3000/api/players`,{
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

      <div className="player-card">
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
          </label>
          <label>
          Handle:
          <input type="text" name="handle" value={this.state.handle} onChange={this.handleChange} />
          </label>
          
          <input type="submit" value="Save" />
          <button onClick={()=>this.handleInsert()}>New Player</button>
        </div>

      </form>
    );
  }
}


const Player = (props) => {
  if(Array.isArray(props.player) ){
    return props.player.map(e => <div><Link href={`/player?id=${e._id}`}><a>{e.name}</a></Link></div>)
  }else{
    if(props.edit)
      return <PlayerForm {...props}/>
    else
      return <PlayerCard {...props}/>
  }
}

Player.getInitialProps = async ({query}) => {
    try {
      let playerid = query.id ? query.id : "";
      let editing = false;
      let player_data;
      if(query.id){
        const player_res = await fetch(`http://localhost:3000/api/players/${playerid}`);//5d7432911c9d4400009a20eb
        player_data = await player_res.json();
        if(query.edit)
          editing = true;
      }else{
        player_data = PlayerModel;
        editing = true;
      }
      return {player:player_data.data, edit:editing};
    
    }catch (err) {
        console.log("Error", err);
    }
}   

export default Player;