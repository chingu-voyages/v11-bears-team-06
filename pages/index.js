import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import './styles.scss';

const Index = (props) => {
    return (
        <div>
            <h1>Bears Team 06</h1>
            <h2 className="example">Voyage 11</h2>
            {props.msg ? <p>This msg is from the backend: {props.msg}</p> : ''}
            <h2>Model test</h2>
            <div>player:{JSON.stringify(props.players)}</div>
            <div>player:{JSON.stringify(props.player)}</div>
        </div>
    )
}

Index.getInitialProps = async () => {
    try {    
        const players_res = await fetch('http://localhost:3000/api/players');
        const players_data = await players_res.json();
        
        const player_res = await fetch('http://localhost:3000/api/players/5d7432911c9d4400009a20eb');
        const player_data = await player_res.json();

        const res = await fetch('http://localhost:3000/test');
        const data = await res.json();
        return {msg:data.msg, players:players_data.data, player:player_data.data};
    }catch (err) {
        console.log("Error", err);
    }
}   

export default Index;