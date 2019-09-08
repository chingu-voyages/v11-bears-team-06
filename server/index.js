require('dotenv').config();
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const dev = process.env.NODE_DEV !== 'production' //true false
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler() //part of next config
const mongoose = require('mongoose')

const db = mongoose.connect(`mongodb+srv://${process.env.DB_LOGIN}:${process.env.DB_PW}@${process.env.DB_HOST}/test?retryWrites=true&w=majority`, { useNewUrlParser: true })
            .catch(err => console.log(err));

nextApp.prepare().then(() => {
    // express code here
    const app = express();
    app.use(bodyParser.json());
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