const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
const mongoose = require('mongoose')

//const db = mongoose.connect('mongodb://localhost:27017/Photos')

nextApp.prepare().then(() => {
    // express code here
    const app = express();
    app.use(bodyParser.json());
    app.get('/test', (req,res)=> res.send({msg:'SportsUp backend is set!'}));
    app.get('*', (req,res)=> {
        return handle(req,res) //for React pages
    });
    app.listen(PORT, err=> {
        if (err) throw err;
        console.log(`server listening on port ${PORT}`);
    })
})