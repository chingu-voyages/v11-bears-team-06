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
const leaguesRouter = require('./routes/leagues').router;
const venuesRouter = require('./routes/venues').router;

nextApp.prepare().then(() => {
    // express code here

    //models
    //TODO should we put these in Context?
    let Player = 0;
    let League = 0;
    let Venue = 0;
    mongoose.connect(`mongodb+srv://${mongo_user}:${mongo_pw}@cluster0-7g4bo.gcp.mongodb.net/sportup?retryWrites=true&w=majority`, { useNewUrlParser: true }).
    then(res => {
        //register our models
        Player = require('./models/playermodel');
        League = require('./models/leaguemodel');
        Venue = require('./models/venuemodel');
    });


    const app = express();
    app.use(bodyParser.json());
    app.get('/test', (req,res) => {

        res.send({msg:'SportsUp backend is set!'});
    });
    

    app.get('/api/initdb', (req,res) => {
        Promise.all([
            Player.deleteMany({}), //clear out the db
            League.deleteMany({}),
            Venue.deleteMany({})]).then( () => { //now add the mock data
                let waitlist = [];
                let playerlist = [];

                //pluscode will be useful in places that don't have an address
                Venue.create({
                    name: "Aztec Stadium",
                    street: "Calz. de Tlalpan 3465",
                    city: "Sta. Úrsula Coapa",
                    district: "Coyoacán",
                    state: "Ciudad de México",
                    zip: "04650",
                    country: "Mexico",
                    latlong: "19.303342, -99.148860",
                    url: "estadioazteca.com.mx",
                    photo: "https://lh5.googleusercontent.com/p/AF1QipOUFCz7XZ-5MaT8RUSvBNUHXbniBMr4xWsg46Ao=w408-h306-k-no",
                    pluscode: "8R3X+4Q Mexico City, Mexico"
                });

                for(let i=0; i<10; i++){
                    waitlist.push(
                        Player.create({
                            name:`player${i}`, 
                            handle:`nickname${i}`
                        })
                    .then( newplayer => playerlist.push(newplayer) ));
                }
                //wait for the above ten players to be created, then add them to leagues two at a time
                Promise.all(waitlist).then( players => {
                    for(i=0; i<5; i++){
                        console.log("player", i,playerlist[(i*2)].id);
                        League.create({
                            name:`league${i}`, 
                            sport:`sport${i}`, 
                            members:[ playerlist[(i*2)].id,playerlist[(i*2)+1].id ]}, err => {
                                if(err)
                                    console.log("failed to create");
                        });
                    }
                });
            });
        res.send({msg:'initializing mock data!'})
    });

    app.use('/api', playersRouter);
    app.use('/api', leaguesRouter);
    app.use('/api', venuesRouter);
    app.use('/', require('./routes/index'));

    app.get('*', (req,res)=> {
        return handle(req,res) //for React pages
    });
    app.listen(PORT, err=> {
        if (err) throw err;
        console.log(`server listening on port ${PORT}`);
    })
})