import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

const Player = (props) => {
  if(Array.isArray(props.player) ){
    return props.player.map(e => <div><Link href={`/player?id=${e._id}`}><a>{e.name}</a></Link></div>)
  }else{
    return (
        <div>
            <h1>{props.player.name}</h1>
            <h2>{props.player.handle}</h2>
        </div>
    )
  }
}

Player.getInitialProps = async ({query}) => {
    try {
      let playerid = query.id ? query.id : "";
        const player_res = await fetch(`http://localhost:3000/api/players/${playerid}`);//5d7432911c9d4400009a20eb
        const player_data = await player_res.json();

        return {player:player_data.data};
    
    }catch (err) {
        console.log("Error", err);
    }
}   

export default Player;