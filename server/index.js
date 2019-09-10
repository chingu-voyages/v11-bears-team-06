const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
require('dotenv').config()

const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
const mongoose = require('mongoose')
const mongo_user = process.env.DB_USER;
const mongo_pw = process.env.DB_PW;

const playersRouter = require('./routes/players').router;

nextApp.prepare().then(() => {
    // express code here
    mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_pw}@cluster0-7g4bo.gcp.mongodb.net/sportup?retryWrites=true&w=majority`).
    then(res => {
        // var playerSchema = new mongoose.Schema({
        //     name: String,
        //     handle: String
        // });
        // var Player = mongoose.model('Player', playerSchema);
        // Player.find( (err, players) => {
        //     if (err) return console.error(err);
        //     console.log(players);
        // })
    });


    const app = express();
    app.use(bodyParser.json());
    app.get('/test', (req,res) => res.send({msg:'SportsUp backend is set!'}));
    app.get('/initdb', (req,res) => {
        res.send({msg:'initializing mock data!'})
    });
    app.use('/api', playersRouter);

    app.get('*', (req,res)=> {
        return handle(req,res) //for React pages
    });
    app.listen(PORT, err=> {
        if (err) throw err;
        console.log(`server listening on port ${PORT}`);
    })
})