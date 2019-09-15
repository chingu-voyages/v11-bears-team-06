import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
// import playermodel from '../server/models/playermodel';

const Player = (props) => {
    return (
        <div>
            <h1>{props.player.name}</h1>
            <h2>{props.player.handle}</h2>
        </div>
    )
}

Player.getInitialProps = async () => {
    try {    
        //TODO get player id from url
        
        const player_res = await fetch('http://localhost:3000/api/players/5d7432911c9d4400009a20eb');
        const player_data = await player_res.json();

        return {player:player_data.data};
    }catch (err) {
        console.log("Error", err);
    }
}   

export default Player;