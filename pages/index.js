import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import Link from 'next/link';

import './styles.scss';



const Collection = (props) => {
    return props[props.collection].map(e => <div><Link href={`/${props.route}?id=${e._id}`}><a>{e.name}</a></Link></div>)
}



const Index = (props) => {
    return (
        <div>
        <h1 className="app-name">Sportsup</h1>
        <h2>Voyage 11: Bears Team 06</h2>
            <h2>Venues</h2>
            <Collection {...props} collection="venues" route="venue"/>
            <h2>Leagues</h2>
            <Collection {...props} collection="leagues" route="league"/>
            <h2>Players</h2>
            <Collection {...props} collection="players" route="player"/>
            <h2>Messages</h2>
            {props.msg ? <p>This msg is from the backend: {props.msg}</p> : ''}

        </div>
    )
}

Index.getInitialProps = async () => {
    try {    
        const players_res = await fetch('http://localhost:3000/api/players');
        const players_data = await players_res.json();
        
        const leagues_res = await fetch('http://localhost:3000/api/leagues');
        const leagues_data = await leagues_res.json();

        const venues_res = await fetch('http://localhost:3000/api/venues');
        const venues_data = await venues_res.json();

        const res = await fetch('http://localhost:3000/test');
        const data = await res.json();
        return {msg:data.msg, players:players_data.data, leagues:leagues_data.data, venues:venues_data.data};
    }catch (err) {
        console.log("Error", err);
    }
}   

export default Index;