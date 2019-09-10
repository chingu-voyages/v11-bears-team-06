import React, { useState } from 'react';
import fetch from 'isomorphic-unfetch';

const Index = (props) => {
    return (
        <div>
            <h1>Bears Team 06</h1>
            <h2>Voyage 11</h2>
            {props.msg ? <p>This msg is from the backend: {props.msg}</p> : ''}
        </div>
    )
}

Index.getInitialProps = async () => {
    try {
        const res = await fetch('http://localhost:3000/test');
        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log("Error", err);
    }
}   

export default Index;