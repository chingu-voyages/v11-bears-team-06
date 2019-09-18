import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';
import league from '../server/models/leaguemodel';

const League = (props) => {
    return (
        <div>
            <h1>{props.league.name}</h1>
            <h2>{props.league.city}, {props.league.zip}</h2>
        </div>
    )
}

League.getInitialProps = async ({query}) => {
    try {    
        //TODO get league id from url
        //could I get league from db via model?

        const league_res = await fetch(`http://localhost:3000/api/league/${query.id}`);
        const league_data = await league_res.json();

        return {league:league_data.data};
    }catch (err) {
        console.log("Error", err);
    }
}   

export default League;