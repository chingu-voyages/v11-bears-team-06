import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
// import player from '../server/models/playermodel';
// import league from '../server/models/leaguemodel';

const Init = (props) => {
    return (
        <div>
            <h1>{props.msg}</h1>
        </div>
    )
}

Init.getInitialProps = async () => {
    try {    
        const res = await fetch('http://localhost:3000/api/initdb');
        const data = await res.json();
        return data;
    }catch (err) {
        console.log("Error", err);
    }
}   

export default Init;