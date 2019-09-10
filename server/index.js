require('dotenv').config()
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')

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
    mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_pw}@cluster0-7g4bo.gcp.mongodb.net/sportup?retryWrites=true&w=majority`, { useNewUrlParser: true }).
    then(res => {
        //nothing to do
    });


    const app = express();
    app.use(bodyParser.json());
    app.get('/test', (req,res) => {

        res.send({msg:'SportsUp backend is set!'});
    });
    
    app.get('/initdb', (req,res) => {
        res.send({msg:'initializing mock data!'})
    });
    app.use('/api', playersRouter);
    app.use('/', require('./routes/index'));
    app.use('/league', require('./routes/league'));
    app.use('/leagues', require('./routes/leagues'));
    app.use('/player', require('./routes/player'));
    app.use('/venue', require('./routes/venue'));

    app.get('*', (req,res)=> {
        return handle(req,res) //for React pages
    });
    app.listen(PORT, err=> {
        if (err) throw err;
        console.log(`server listening on port ${PORT}`);
    })
})